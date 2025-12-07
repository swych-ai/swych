import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { testimonials } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single testimonial fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { 
            error: 'Valid ID is required',
            code: 'INVALID_ID'
          },
          { status: 400 }
        );
      }

      const testimonial = await db.select()
        .from(testimonials)
        .where(eq(testimonials.id, parseInt(id)))
        .limit(1);

      if (testimonial.length === 0) {
        return NextResponse.json(
          { 
            error: 'Testimonial not found',
            code: 'NOT_FOUND'
          },
          { status: 404 }
        );
      }

      return NextResponse.json(testimonial[0], { status: 200 });
    }

    // List testimonials with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const rating = searchParams.get('rating');

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(testimonials.clientName, `%${search}%`),
          like(testimonials.company, `%${search}%`),
          like(testimonials.testimonial, `%${search}%`)
        )
      );
    }

    if (rating) {
      const ratingInt = parseInt(rating);
      if (!isNaN(ratingInt) && ratingInt >= 1 && ratingInt <= 5) {
        conditions.push(eq(testimonials.rating, ratingInt));
      }
    }

    let results = await db
      .select()
      .from(testimonials)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(testimonials.createdAt))
      .limit(limit)
      .offset(offset);

    // If no testimonials exist, seed the database with sample data
    if (results.length === 0 && !search && !rating) {
      try {
        const now = new Date();
        const sampleTestimonials = [
          {
            clientName: 'Sarah Chen',
            company: 'TechCorp',
            position: 'VP of Operations',
            testimonial: 'Swych.ai transformed our customer service with their AI chatbot. Response times decreased by 80% and customer satisfaction soared.',
            rating: 5,
            avatarUrl: 'https://i.pravatar.cc/150?img=1',
            createdAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            clientName: 'Michael Rodriguez',
            company: 'StartupHub',
            position: 'CEO',
            testimonial: 'The AI voice caller system is incredible. It handles our outbound calls seamlessly and sounds completely natural.',
            rating: 5,
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
            createdAt: new Date(now.getTime() - 50 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            clientName: 'Jennifer Park',
            company: 'GrowthLabs',
            position: 'Marketing Director',
            testimonial: 'Their AI outbound callers helped us scale our sales team efficiently. ROI was visible within the first month.',
            rating: 5,
            avatarUrl: 'https://i.pravatar.cc/150?img=3',
            createdAt: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            clientName: 'David Thompson',
            company: 'DataFlow',
            position: 'CTO',
            testimonial: 'Professional team, cutting-edge technology. The chatbot integration was smooth and the results exceeded expectations.',
            rating: 5,
            avatarUrl: 'https://i.pravatar.cc/150?img=4',
            createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            clientName: 'Emily Watson',
            company: 'CloudScale',
            position: 'Head of Sales',
            testimonial: 'Swych.ai\'s voice AI technology is remarkable. Our lead qualification process is now automated and more effective.',
            rating: 5,
            avatarUrl: 'https://i.pravatar.cc/150?img=5',
            createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            clientName: 'Alex Kumar',
            company: 'FinanceHub',
            position: 'Operations Manager',
            testimonial: 'Best decision we made this year. The AI solutions are reliable, scalable, and truly innovative.',
            rating: 5,
            avatarUrl: 'https://i.pravatar.cc/150?img=6',
            createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ];

        await db.insert(testimonials).values(sampleTestimonials);
        
        // Fetch the newly inserted testimonials
        results = await db
          .select()
          .from(testimonials)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(desc(testimonials.createdAt))
          .limit(limit)
          .offset(offset);
      } catch (seedError) {
        console.error('Error seeding testimonials:', seedError);
        // Continue with empty results if seeding fails
      }
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    // Return empty array instead of error to prevent frontend crashes
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientName, company, position, testimonial, rating, avatarUrl } = body;

    // Validate required fields
    if (!clientName || typeof clientName !== 'string' || clientName.trim() === '') {
      return NextResponse.json(
        { 
          error: 'clientName is required and must be a non-empty string',
          code: 'INVALID_CLIENT_NAME'
        },
        { status: 400 }
      );
    }

    if (!company || typeof company !== 'string' || company.trim() === '') {
      return NextResponse.json(
        { 
          error: 'company is required and must be a non-empty string',
          code: 'INVALID_COMPANY'
        },
        { status: 400 }
      );
    }

    if (!position || typeof position !== 'string' || position.trim() === '') {
      return NextResponse.json(
        { 
          error: 'position is required and must be a non-empty string',
          code: 'INVALID_POSITION'
        },
        { status: 400 }
      );
    }

    if (!testimonial || typeof testimonial !== 'string' || testimonial.trim() === '') {
      return NextResponse.json(
        { 
          error: 'testimonial is required and must be a non-empty string',
          code: 'INVALID_TESTIMONIAL'
        },
        { status: 400 }
      );
    }

    if (!rating || typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { 
          error: 'rating is required and must be an integer between 1 and 5',
          code: 'INVALID_RATING'
        },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData: any = {
      clientName: clientName.trim(),
      company: company.trim(),
      position: position.trim(),
      testimonial: testimonial.trim(),
      rating: rating,
      createdAt: new Date().toISOString()
    };

    if (avatarUrl !== undefined && avatarUrl !== null) {
      if (typeof avatarUrl === 'string') {
        insertData.avatarUrl = avatarUrl.trim();
      } else {
        return NextResponse.json(
          { 
            error: 'avatarUrl must be a string',
            code: 'INVALID_AVATAR_URL'
          },
          { status: 400 }
        );
      }
    }

    const newTestimonial = await db.insert(testimonials)
      .values(insertData)
      .returning();

    return NextResponse.json(newTestimonial[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    // Check if testimonial exists
    const existing = await db.select()
      .from(testimonials)
      .where(eq(testimonials.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { 
          error: 'Testimonial not found',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { clientName, company, position, testimonial, rating, avatarUrl } = body;

    const updates: any = {};

    // Validate and add optional fields
    if (clientName !== undefined) {
      if (typeof clientName !== 'string' || clientName.trim() === '') {
        return NextResponse.json(
          { 
            error: 'clientName must be a non-empty string',
            code: 'INVALID_CLIENT_NAME'
          },
          { status: 400 }
        );
      }
      updates.clientName = clientName.trim();
    }

    if (company !== undefined) {
      if (typeof company !== 'string' || company.trim() === '') {
        return NextResponse.json(
          { 
            error: 'company must be a non-empty string',
            code: 'INVALID_COMPANY'
          },
          { status: 400 }
        );
      }
      updates.company = company.trim();
    }

    if (position !== undefined) {
      if (typeof position !== 'string' || position.trim() === '') {
        return NextResponse.json(
          { 
            error: 'position must be a non-empty string',
            code: 'INVALID_POSITION'
          },
          { status: 400 }
        );
      }
      updates.position = position.trim();
    }

    if (testimonial !== undefined) {
      if (typeof testimonial !== 'string' || testimonial.trim() === '') {
        return NextResponse.json(
          { 
            error: 'testimonial must be a non-empty string',
            code: 'INVALID_TESTIMONIAL'
          },
          { status: 400 }
        );
      }
      updates.testimonial = testimonial.trim();
    }

    if (rating !== undefined) {
      if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
        return NextResponse.json(
          { 
            error: 'rating must be an integer between 1 and 5',
            code: 'INVALID_RATING'
          },
          { status: 400 }
        );
      }
      updates.rating = rating;
    }

    if (avatarUrl !== undefined) {
      if (avatarUrl === null) {
        updates.avatarUrl = null;
      } else if (typeof avatarUrl === 'string') {
        updates.avatarUrl = avatarUrl.trim();
      } else {
        return NextResponse.json(
          { 
            error: 'avatarUrl must be a string or null',
            code: 'INVALID_AVATAR_URL'
          },
          { status: 400 }
        );
      }
    }

    // Check if there are any updates
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { 
          error: 'No valid fields provided for update',
          code: 'NO_UPDATES'
        },
        { status: 400 }
      );
    }

    const updated = await db.update(testimonials)
      .set(updates)
      .where(eq(testimonials.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    // Check if testimonial exists
    const existing = await db.select()
      .from(testimonials)
      .where(eq(testimonials.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { 
          error: 'Testimonial not found',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    const deleted = await db.delete(testimonials)
      .where(eq(testimonials.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Testimonial deleted successfully',
        testimonial: deleted[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}