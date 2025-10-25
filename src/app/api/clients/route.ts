import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { clients } from '@/db/schema';
import { eq, like, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single client by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const client = await db
        .select()
        .from(clients)
        .where(eq(clients.id, parseInt(id)))
        .limit(1);

      if (client.length === 0) {
        return NextResponse.json(
          { error: 'Client not found', code: 'CLIENT_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(client[0], { status: 200 });
    }

    // List clients with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    const results = await db
      .select()
      .from(clients)
      .where(
        search
          ? or(
              like(clients.companyName, `%${search}%`),
              like(clients.description, `%${search}%`)
            )
          : undefined
      )
      .orderBy(desc(clients.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, logoUrl, description, websiteUrl } = body;

    // Validate required fields
    if (!companyName || typeof companyName !== 'string' || companyName.trim() === '') {
      return NextResponse.json(
        { error: 'Company name is required and must be a non-empty string', code: 'INVALID_COMPANY_NAME' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedCompanyName = companyName.trim();
    const sanitizedLogoUrl = logoUrl ? logoUrl.trim() : null;
    const sanitizedDescription = description ? description.trim() : null;
    const sanitizedWebsiteUrl = websiteUrl ? websiteUrl.trim() : null;

    // Validate website URL format if provided
    if (sanitizedWebsiteUrl) {
      try {
        new URL(sanitizedWebsiteUrl);
      } catch {
        return NextResponse.json(
          { error: 'Invalid website URL format', code: 'INVALID_WEBSITE_URL' },
          { status: 400 }
        );
      }
    }

    // Create new client
    const newClient = await db
      .insert(clients)
      .values({
        companyName: sanitizedCompanyName,
        logoUrl: sanitizedLogoUrl,
        description: sanitizedDescription,
        websiteUrl: sanitizedWebsiteUrl,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newClient[0], { status: 201 });
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if client exists
    const existingClient = await db
      .select()
      .from(clients)
      .where(eq(clients.id, parseInt(id)))
      .limit(1);

    if (existingClient.length === 0) {
      return NextResponse.json(
        { error: 'Client not found', code: 'CLIENT_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { companyName, logoUrl, description, websiteUrl } = body;

    // Build updates object with only provided fields
    const updates: any = {};

    if (companyName !== undefined) {
      if (typeof companyName !== 'string' || companyName.trim() === '') {
        return NextResponse.json(
          { error: 'Company name must be a non-empty string', code: 'INVALID_COMPANY_NAME' },
          { status: 400 }
        );
      }
      updates.companyName = companyName.trim();
    }

    if (logoUrl !== undefined) {
      updates.logoUrl = logoUrl ? logoUrl.trim() : null;
    }

    if (description !== undefined) {
      updates.description = description ? description.trim() : null;
    }

    if (websiteUrl !== undefined) {
      const sanitizedWebsiteUrl = websiteUrl ? websiteUrl.trim() : null;
      if (sanitizedWebsiteUrl) {
        try {
          new URL(sanitizedWebsiteUrl);
        } catch {
          return NextResponse.json(
            { error: 'Invalid website URL format', code: 'INVALID_WEBSITE_URL' },
            { status: 400 }
          );
        }
      }
      updates.websiteUrl = sanitizedWebsiteUrl;
    }

    // Update client
    const updatedClient = await db
      .update(clients)
      .set(updates)
      .where(eq(clients.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedClient[0], { status: 200 });
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if client exists before deleting
    const existingClient = await db
      .select()
      .from(clients)
      .where(eq(clients.id, parseInt(id)))
      .limit(1);

    if (existingClient.length === 0) {
      return NextResponse.json(
        { error: 'Client not found', code: 'CLIENT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete client
    const deletedClient = await db
      .delete(clients)
      .where(eq(clients.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Client deleted successfully',
        client: deletedClient[0],
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