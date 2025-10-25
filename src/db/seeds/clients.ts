import { db } from '@/db';
import { clients } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const sampleClients = [
        {
            companyName: 'TechCorp',
            logoUrl: 'https://source.unsplash.com/100x100/?tech,logo',
            description: 'Enterprise software solutions',
            websiteUrl: 'https://techcorp.example.com',
            createdAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            companyName: 'StartupHub',
            logoUrl: 'https://source.unsplash.com/100x100/?startup,logo',
            description: 'Startup accelerator platform',
            websiteUrl: 'https://startuphub.example.com',
            createdAt: new Date(now.getTime() - 80 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            companyName: 'GrowthLabs',
            logoUrl: 'https://source.unsplash.com/100x100/?marketing,logo',
            description: 'Digital marketing agency',
            websiteUrl: 'https://growthlabs.example.com',
            createdAt: new Date(now.getTime() - 70 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            companyName: 'DataFlow',
            logoUrl: 'https://source.unsplash.com/100x100/?data,logo',
            description: 'Data analytics platform',
            websiteUrl: 'https://dataflow.example.com',
            createdAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            companyName: 'CloudScale',
            logoUrl: 'https://source.unsplash.com/100x100/?cloud,logo',
            description: 'Cloud infrastructure provider',
            websiteUrl: 'https://cloudscale.example.com',
            createdAt: new Date(now.getTime() - 50 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            companyName: 'FinanceHub',
            logoUrl: 'https://source.unsplash.com/100x100/?finance,logo',
            description: 'Financial services platform',
            websiteUrl: 'https://financehub.example.com',
            createdAt: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            companyName: 'HealthTech Solutions',
            logoUrl: 'https://source.unsplash.com/100x100/?health,logo',
            description: 'Healthcare technology provider',
            websiteUrl: 'https://healthtech.example.com',
            createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            companyName: 'RetailAI',
            logoUrl: 'https://source.unsplash.com/100x100/?retail,logo',
            description: 'E-commerce automation platform',
            websiteUrl: 'https://retailai.example.com',
            createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];

    await db.insert(clients).values(sampleClients);
    
    console.log('✅ Clients seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});