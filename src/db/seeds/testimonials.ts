import { db } from '@/db';
import { testimonials } from '@/db/schema';

async function main() {
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
    
    console.log('✅ Testimonials seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});