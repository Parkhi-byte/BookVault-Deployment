import mongoose from "mongoose";
import { config } from "./config.js";
import Book from "./model/book.model.js";
import User from "./model/user.model.js";
import bcryptjs from "bcryptjs";

const sampleBooks = [
    // Free Books
    {
        name: "The Great Adventure",
        title: "A thrilling journey through mysterious lands where courage meets destiny. Follow our hero as they discover ancient secrets and face unimaginable challenges.",
        intro: "In a world where magic still exists and legends come to life, young Alex discovers they are the chosen one destined to save their kingdom from an ancient evil. This epic fantasy novel takes readers on a journey filled with adventure, friendship, and self-discovery. From the bustling streets of the capital to the forbidden forests of the north, every page brings new challenges and revelations.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        author: "Sarah Johnson",
        pages: 320,
        genre: "Fantasy"
    },
    {
        name: "The Silent Echo",
        title: "A psychological thriller that will keep you guessing until the very last page. When silence speaks louder than words, what secrets will be revealed?",
        intro: "Detective Maria Torres investigates a series of mysterious disappearances in a small coastal town. As she delves deeper into the case, she discovers that the town holds dark secrets that have been buried for decades. The more she uncovers, the more dangerous her investigation becomes. This gripping thriller explores themes of justice, redemption, and the price of truth.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
        author: "Michael Chen",
        pages: 280,
        genre: "Thriller"
    },
    {
        name: "The Art of Innovation",
        title: "Discover the secrets behind successful innovation and learn how to transform your ideas into reality. A comprehensive guide for entrepreneurs and creators.",
        intro: "Innovation isn't just about having great ideas—it's about executing them effectively. This practical guide combines real-world case studies with actionable strategies to help you bring your innovations to life. Whether you're a startup founder, corporate executive, or creative professional, you'll find valuable insights on building innovative teams, overcoming obstacles, and creating lasting impact.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        author: "Dr. Emily Rodriguez",
        pages: 240,
        genre: "Business"
    },
    {
        name: "The Quantum Garden",
        title: "A mind-bending science fiction novel that explores the intersection of technology, consciousness, and the nature of reality itself.",
        intro: "In the year 2157, Dr. Elena Park creates the first quantum consciousness interface, allowing humans to experience reality in ways never before possible. But when the technology falls into the wrong hands, she must race against time to prevent a global catastrophe. This thought-provoking novel examines the ethical implications of advanced technology and what it means to be human in an increasingly digital world.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        author: "James Williams",
        pages: 350,
        genre: "Science Fiction"
    },
    {
        name: "The Heart's Compass",
        title: "A touching romance that proves love can be found in the most unexpected places. Sometimes the heart knows the way even when the mind is lost.",
        intro: "When travel writer Claire Bennett returns to her hometown after a decade abroad, she doesn't expect to fall in love with her childhood friend's brother. As they navigate their growing feelings, they must confront past hurts and future uncertainties. This heartwarming romance explores themes of second chances, family bonds, and the courage to follow your heart.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
        author: "Lisa Thompson",
        pages: 290,
        genre: "Romance"
    },
    {
        name: "The Mathematical Universe",
        title: "Explore the fascinating world of mathematics through engaging stories and real-world applications. Perfect for students and curious minds alike.",
        intro: "Mathematics is the language of the universe, and this book makes it accessible to everyone. From the beauty of prime numbers to the elegance of calculus, each chapter reveals how mathematical concepts shape our world. Through historical anecdotes, practical examples, and thought-provoking puzzles, readers will discover the joy and wonder of mathematics.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
        author: "Prof. David Kim",
        pages: 310,
        genre: "Educational"
    },
    {
        name: "The Science of Everything",
        title: "From atoms to galaxies, explore the fundamental principles that govern our universe. A comprehensive introduction to modern science.",
        intro: "Science is not just a collection of facts—it's a way of understanding the world around us. This book takes readers on a journey through physics, chemistry, biology, and astronomy, explaining complex concepts in simple terms. With stunning illustrations and real-world examples, you'll gain a deeper appreciation for the natural world and the scientific method.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
        author: "Dr. Rachel Green",
        pages: 380,
        genre: "Science"
    },
    {
        name: "Career Mastery",
        title: "Your complete guide to building a successful career in the modern workplace. Learn strategies that work in today's competitive job market.",
        intro: "The world of work is changing rapidly, and success requires new skills and strategies. This comprehensive guide covers everything from personal branding and networking to negotiation and leadership. Whether you're just starting your career or looking to advance to the next level, you'll find practical advice and proven techniques to achieve your professional goals.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
        author: "Career Coach Sarah Martinez",
        pages: 260,
        genre: "Self-Help"
    },
    {
        name: "The Power Within",
        title: "Unlock your potential and discover the strength you never knew you had. A motivational guide to personal transformation and success.",
        intro: "Every person has unlimited potential waiting to be unleashed. This motivational book combines psychological insights with practical exercises to help you overcome limiting beliefs, build confidence, and achieve your dreams. Through inspiring stories and actionable strategies, you'll learn how to tap into your inner strength and create the life you truly desire.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        author: "Tony Anderson",
        pages: 220,
        genre: "Motivation"
    },
    {
        name: "Cultural Tapestry",
        title: "A celebration of world cultures through stories, traditions, and shared human experiences. Discover the beauty of diversity.",
        intro: "Our world is a rich tapestry of cultures, each with its own unique traditions, stories, and wisdom. This book takes readers on a global journey, exploring the customs, beliefs, and practices that make each culture special. From ancient rituals to modern celebrations, you'll gain a deeper understanding and appreciation for the diversity that makes our world beautiful.",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
        author: "Cultural Anthropologist Dr. Priya Patel",
        pages: 340,
        genre: "Cultural Studies"
    },
    // Paid Books
    {
        name: "The Master's Code",
        title: "An exclusive guide to advanced programming techniques and software architecture. Master the art of building scalable, maintainable applications.",
        intro: "Take your programming skills to the next level with this comprehensive guide to advanced software development. Learn design patterns, architectural principles, and best practices used by industry experts. From microservices to cloud-native applications, this book covers the techniques and technologies that power modern software systems. Perfect for experienced developers looking to advance their careers.",
        price: 29.99,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
        author: "Senior Software Architect Mark Johnson",
        pages: 450,
        genre: "Technology"
    },
    {
        name: "The Business Blueprint",
        title: "A proven framework for building and scaling successful businesses. Learn from real entrepreneurs who have built million-dollar companies.",
        intro: "Building a successful business requires more than just a good idea—it needs a solid foundation and proven strategies. This book provides a comprehensive blueprint for entrepreneurs at every stage, from startup to scale-up. Through case studies, expert interviews, and practical frameworks, you'll learn how to validate ideas, build teams, secure funding, and create sustainable growth.",
        price: 39.99,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
        author: "Serial Entrepreneur Jennifer Lee",
        pages: 520,
        genre: "Business"
    },
    {
        name: "The Creative Mind",
        title: "Unlock your creative potential and learn how to generate breakthrough ideas consistently. A masterclass in creative thinking and innovation.",
        intro: "Creativity is not a talent—it's a skill that can be developed and mastered. This book reveals the techniques and mindsets used by the world's most creative people. Through exercises, case studies, and proven methodologies, you'll learn how to overcome creative blocks, generate innovative ideas, and bring your creative vision to life. Whether you're an artist, entrepreneur, or problem-solver, this book will transform your creative process.",
        price: 24.99,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop",
        author: "Creative Director Alex Rivera",
        pages: 380,
        genre: "Creativity"
    }
];

const sampleUsers = [
    {
        fullname: "Demo User",
        email: "demo@example.com",
        password: "demo123"
    },
    {
        fullname: "Test User",
        email: "test@example.com",
        password: "test123"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("Connected to MongoDB");
        
        // Clear existing data
        await Book.deleteMany({});
        console.log("Cleared existing books");
        
        await User.deleteMany({});
        console.log("Cleared existing users");
        
        // Insert sample books
        const booksResult = await Book.insertMany(sampleBooks);
        console.log(`Inserted ${booksResult.length} books`);
        
        // Insert sample users with hashed passwords
        const hashedUsers = await Promise.all(
            sampleUsers.map(async (user) => ({
                ...user,
                password: await bcryptjs.hash(user.password, 10)
            }))
        );
        
        const usersResult = await User.insertMany(hashedUsers);
        console.log(`Inserted ${usersResult.length} users`);
        
        console.log("Database seeded successfully!");
        console.log("\nSample user credentials:");
        console.log("Email: demo@example.com, Password: demo123");
        console.log("Email: test@example.com, Password: test123");
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
