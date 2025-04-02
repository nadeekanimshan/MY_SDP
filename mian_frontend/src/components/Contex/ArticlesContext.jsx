import React, { createContext, useContext, useState } from 'react';

import { assest } from '../../assest/assest'; // Import the assets (like images)

// Create a Context for Articles
const ArticlesContext = createContext();

// Provider component that will wrap the app
export const ArticlesProvider = ({ children }) => {
  // State to manage all articles
  const [articles, setArticles] = useState({
    allArticles: [
      {
        id: 1,
        category: 'IT(Social)',
        title: 'A Dream for the Living',
        imageUrl: assest.L1,
        author: 'Dilisha Bhagya Madushan',
        authorImage: assest.td5, // Author image
        date: '11 November, 2024',
        section: 'top',
        content: 'What if I were to tell you that we as a species are at a crossroad?...'
      },
      {
        id: 2,
        category: 'IT(AI)',
        title: 'AI and Machine Learning Trends in Business',
        imageUrl: assest.L2,
        author: 'HMRV HERATH ',
        authorImage: assest.td12, 
        date: '10 November, 2024',
        section: 'top',
        content: 'Artificial Intelligence (AI) is no longer just a buzzword or a ...',
      },
      {
        id: 3,
        category: 'IT(AI)',
        title: 'Core of A.I - Brain Reimagined',
        imageUrl: assest.L3,
        author: 'Dinith Devinda',
        authorImage: assest.td13, // Author image
        date: '05 November, 2024',
        section: 'top',
        content: 'Imagine a world where machines mimic human intelligence to solve complex problems...', // Article content
      },
      {
        id: 4,
        category: 'Management',
        title: 'Transforming Tourism Industry of Sri Lanka',
        imageUrl: assest.L4,
        author: ' P. M. Sudeepa Lakshan',
        authorImage: assest.td3, // Author image
        date: '09 November, 2024',
        section: 'editorChoice',
        content: 'Tourism industry of Sri Lanka is a critical driver of economic growth, contributing...',
      },
      {
        id: 5,
        category: 'IT(AI)',
        title: 'Unlocking the Future of IT Management in a Smart World ',
        imageUrl: assest.L5,
        author: 'Rasini Ranaweera ',
        authorImage: assest.td8, // Author image
        date: '15 November, 2024',
        section: 'recent',
        content: 'As the world moves deeper into the digital economy, AI is proving how it can be...',
      },
      {
        id: 6,
        category: 'IT(AI)',
        title: 'Tech-Driven Leadership',
        imageUrl: assest.L6,
        author: 'Ms. Hasini Nimesha ',
        authorImage: assest.a, // Author image
        date: '14 November, 2024',
        section: 'recent',
        content: 'Have you ever wondered how leaders ave you ever wondered how leaders...',
      },
      {
        id: 7,
        category: 'IT(AI)',
        title: 'Would you rather fall in love with AI?',
        imageUrl: assest.L7,
        author: 'Imasha Samarasinghe',
        authorImage: assest.td4, // Author image
        date: '10 November, 2024',
        section: 'editorChoice',
        content: 'With the popularity of AI these days, people are using them for many purposes. ...',
      },
      {
        id: 8,
        category: 'IT(Social)',
        title: 'Voices that Heal: The Role of Speech Emotion Recognition in Mental Health ',
        imageUrl: assest.L9,
        author: 'Naethree Premnath',
        authorImage: assest.td6, // Author image
        date: '12 November, 2024',
        section: 'editorChoice',
        content: 'In the silent depths of the human mind, emotions stir and often go unnoticed. But what...',
      },
      {
        id: 9,
        category: 'IT(AI)',
        title: 'Decoding Sustainability',
        imageUrl: assest.L10,
        author: 'Sasanka Wakista',
        authorImage: assest.td11, // Author image
        date: '14 November, 2024',
        section: 'editorChoice',
        content: 'As the complexity of global chalenges grows, the demands on technology to provide ...',
      },
      {
        id: 10,
        category: 'Management',
        title: 'Sri Lanka Trade Landscape and Strategies for Future Trade Recovery',
        imageUrl: assest.L11,
        author: ' K.Kobishanth ',
        authorImage: assest.td7, // Author image
        date: '12 November, 2024',
        section: 'top',
        content: 'Sri Lanka trade landscape stands out as strategically diverse within South Asia...',
      },
      {
        id: 11,
        category: 'IT(Social)',
        title: 'Impact of Quantum Computing on Modern Cryptography and Security ',
        imageUrl: assest.L12,
        author: ' S.Sandali Edirisinghe ',
        authorImage: assest.td10, // Author image
        date: '12 November, 2024',
        section: 'recent',
        content: 'The use of codes is very significant today in solving the problem of ...',
      },
      {
        id: 12,
        category: 'IT(Social)',
        title: 'The role of cyber security in protecting against internet scams ',
        imageUrl: assest.L13,
        author: ' Dulmi Wijerathna',
        authorImage: assest.td9, // Author image
        date: '12 November, 2024',
        section: 'top',
        content: 'in today’s digital age, cyber security has become a critical aspect to our daily lives...',
      },
      {
        id: 13,
        category: 'IT(Social)',
        title: 'TheUnsungArchitects of the Digital Age: Recognizing the Challenges and Contributions of Software Developers',
        imageUrl: assest.L14,
        author: ' Nethuni Rajapakse',
        authorImage: assest.td14, // Author image
        date: '12 November, 2024',
        section: 'recent',
        content: ' Picture an imposing city of skyscrapers, elaborately interlaced bridges...',
      },
      {
        id: 14,
        category: 'IT(Social)',
        title: 'Understanding NFC Technology: An Insightful Guide',
        imageUrl: assest.L15,
        author: ' Gaviru Bihan',
        authorImage: assest.p14, // Author image
        date: '12 November, 2024',
        section: 'top',
        content: 'Today, we will delve into the world of NFC technology. Some of you may have heard...',
      },{
        id: 15,
        category: 'Management',
        title: 'Blockchain Systems in the Global Logistics Industry',
        imageUrl: assest.L16,
        author: ' Mishara Wickramasinghe',
        authorImage: assest.td16, // Author image
        date: '12 November, 2024',
        section: 'top',
        content: 'Blockchain is a distributed ledger technology that is based on...',
      },
      {
        id: 16,
        category: 'IT(AI)',
        title: 'AI Power Consumption: A Rapidly Emerging Mission-Critical Concern',
        imageUrl: assest.L18,
        author: 'Pramudhitha Vidushan',
        authorImage: assest.admin, // Author image
        date: '12 November, 2024',
        section: 'top',
        content: ' In today’s landscape of artificial intelligence, the surge in demand for AI...',
      },
      {
        id: 17,
        category: 'Management',
        title: 'Bridging Management and Technology for Entrepreneurial Innovation',
        imageUrl: assest.L17,
        author: ' Pathum Lakruwan',
        authorImage: assest.admin, // Author image
        date: '12 November, 2024',
        section: 'top',
        content: 'In the fast-paced landscape of modern business, innovation is the key to...',
      },
      {
        id: 18,
        category: 'Management',
        title: 'LIFE WAS MUCH EASIER, WHEN APPLE AND BLACKBERRY WERE JUST FRUITS.',
        imageUrl: assest.HH11,
        author: ' L.A.D. Praveen Achintha ',
        authorImage: assest.td15,
        date: '12 November, 2024',
        section: 'editorChoice',
        content: 'Imagine that you can travel across time and get a glimpse of your childhood...',
      }
      // Add more articles as needed...
    ],
  });

  // Function to get articles by section (e.g., "top", "recent", etc.)
  const getArticlesBySection = (section) => {
    return articles.allArticles.filter((article) => article.section === section);
  };

  // Function to get all articles (including normal ones) without filtering by section
  const getAllArticles = () => {
    return articles.allArticles;
  };

  // Function to get a single article by its ID (to display the full article)
  const getArticleById = (id) => {
    return articles.allArticles.find((article) => article.id === id);
  };

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,  // Exposing the setArticles function to update the state
        getArticlesBySection,
        getAllArticles,
        getArticleById,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

// Custom hook to use the ArticlesContext
export const useArticles = () => useContext(ArticlesContext);
