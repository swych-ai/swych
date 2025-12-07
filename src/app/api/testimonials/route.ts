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

    const results = await db
      .select()
      .from(testimonials)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(testimonials.createdAt))
      .limit(limit)
      .offset(offset);

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