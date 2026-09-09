import { ALL_WORKSHEETS } from '../src/data/catalog';

const baseTemplate = (title: string, description: string, content: string, ogImage = '/og-image.png') => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="online worksheets for kids, free printable worksheets, kindergarten worksheets, 1st grade math, phonics worksheets, educational games for kids, elementary school worksheets, science worksheets, typing games for kids" />
    <meta name="author" content="onlineworksheetsforkidss" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#7C3AED" />
    <link rel="canonical" href="https://onlineworksheetsforkidss.com" />

    <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
    <link rel="manifest" href="/favicon_io/site.webmanifest" />

    <meta property="og:site_name" content="onlineworksheetsforkidss" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://onlineworksheetsforkidss.com" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="/assets/index.css" />
  </head>
  <body class="bg-[#F8F7FF] text-[#2D2A4A] font-['Quicksand',sans-serif] antialiased selection:bg-purple-200">
    <div id="root">${content}</div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>
`;

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function generateWorksheetList(): string {
  const grades = ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];
  const worksheetsByGrade = grades.map((grade) => {
    const worksheets = ALL_WORKSHEETS.filter((w) =>
      w.grades.some((g) => g === grade.split(' ')[0].toLowerCase() || g === grade)
    );
    return `
      <div class="grade-section">
        <h3>${grade}</h3>
        <ul>
          ${worksheets.slice(0, 5).map((w) => `<li>${escapeHtml(w.title)}</li>`).join('')}
        </ul>
      </div>
    `;
  });
  return worksheetsByGrade.join('');
}

function generateSubjectList(): string {
  const subjects = ['Math', 'Phonics', 'Science', 'Typing'];
  return subjects
    .map((subject) => {
      const worksheets = ALL_WORKSHEETS.filter((w) =>
        w.subject.toLowerCase() === subject.toLowerCase()
      );
      return `
        <div class="subject-section">
          <h3>${subject}</h3>
          <p>${worksheets.length} worksheets available</p>
          <ul>
            ${worksheets.slice(0, 5).map((w) => `<li>${escapeHtml(w.title)}</li>`).join('')}
          </ul>
        </div>
      `;
    })
    .join('');
}

export function renderHomePage(): string {
  const content = `
    <nav class="navbar">
      <h1>onlineworksheetsforkidss - 1,000+ Free Interactive Worksheets</h1>
      <p>Explore educational games and printable worksheets for K-5th Grade</p>
    </nav>
    <main>
      <section class="hero">
        <h1>Learning Made Fun: 1,000+ Interactive Worksheets for Kids</h1>
        <p>Engage your students with math, phonics, science, and typing games aligned with elementary curriculum</p>
      </section>
      <section class="catalog">
        <h2>Featured Worksheets</h2>
        ${generateWorksheetList()}
      </section>
      <section class="cta">
        <h2>Ready to Get Started?</h2>
        <p>Create a free account to track progress, earn rewards, and compete on leaderboards!</p>
      </section>
    </main>
    <footer>
      <p>© 2026 onlineworksheetsforkidss. All rights reserved. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms & Conditions</a></p>
    </footer>
  `;

  return baseTemplate(
    'onlineworksheetsforkidss - 1,000+ Free Interactive & Printable Worksheets for Kids',
    'Explore 1,000+ interactive educational worksheets and games for Kindergarten through 5th Grade. Gamified math, phonics, reading, science, and typing adventures.',
    content
  );
}

export function renderSeoPage(page: string): string {
  const pages: Record<string, { title: string; description: string; content: string }> = {
    grades: {
      title: 'Worksheets by Grade | K-5th Grade | onlineworksheetsforkidss',
      description: 'Free worksheets organized by grade level: Kindergarten, 1st, 2nd, 3rd, 4th, and 5th Grade. Aligned with elementary school standards.',
      content: `
        <nav><h1>Worksheets by Grade</h1></nav>
        <main>
          <h1>Grade-Specific Learning Worksheets</h1>
          ${generateWorksheetList()}
        </main>
      `,
    },
    subjects: {
      title: 'Worksheets by Subject | Math, Phonics, Science & Typing | onlineworksheetsforkidss',
      description: 'Browse worksheets by subject: Math games, Phonics & Reading, Science, and Touch Typing. Over 1,000 interactive activities.',
      content: `
        <nav><h1>Worksheets by Subject</h1></nav>
        <main>
          <h1>Learning by Subject</h1>
          ${generateSubjectList()}
        </main>
      `,
    },
    printables: {
      title: 'Free Printable Worksheets | PDF Downloads | onlineworksheetsforkidss',
      description: 'Download and print 1,000+ free worksheet PDFs for classroom and home learning. Math, reading, science, and more.',
      content: `
        <nav><h1>Printable Worksheets Hub</h1></nav>
        <main>
          <h1>Free Printable Worksheets</h1>
          <p>All ${ALL_WORKSHEETS.length} worksheets are available as printable PDFs for classroom and home use.</p>
          <ul>
            ${ALL_WORKSHEETS.slice(0, 20).map((w) => `<li><strong>${escapeHtml(w.title)}</strong> - ${escapeHtml(w.subject)}</li>`).join('')}
          </ul>
        </main>
      `,
    },
    curriculum: {
      title: 'Curriculum Standards & Learning Objectives | onlineworksheetsforkidss',
      description: 'Our worksheets align with Common Core and elementary school curriculum standards for K-5th Grade.',
      content: `
        <nav><h1>Curriculum Standards</h1></nav>
        <main>
          <h1>Aligned with Education Standards</h1>
          <p>All worksheets are designed to align with Common Core State Standards and elementary school curriculum requirements.</p>
          <h2>Covered Standards</h2>
          <ul>
            <li>Math: Addition, Subtraction, Multiplication, Division, Fractions, Geometry</li>
            <li>Reading: Phonics, Sight Words, Comprehension, Fluency</li>
            <li>Science: Life Science, Earth Science, Physical Science</li>
            <li>Technology: Keyboarding, Digital Literacy</li>
          </ul>
        </main>
      `,
    },
    faqs: {
      title: 'Frequently Asked Questions | onlineworksheetsforkidss',
      description: 'Find answers to common questions about online worksheets, accounts, printing, and learning features.',
      content: `
        <nav><h1>FAQ</h1></nav>
        <main>
          <h1>Frequently Asked Questions</h1>
          <h2>Are the worksheets free?</h2>
          <p>Yes! All 1,000+ worksheets and games are completely free.</p>
          <h2>Can I print the worksheets?</h2>
          <p>Yes, all worksheets can be printed as clean PDF files.</p>
          <h2>What grade levels are supported?</h2>
          <p>We support Kindergarten through 5th Grade.</p>
          <h2>Do you track progress?</h2>
          <p>Yes, create a free account to track student progress and earn rewards.</p>
        </main>
      `,
    },
    terms: {
      title: 'Terms & Conditions | onlineworksheetsforkidss',
      description: 'Read our terms and conditions for using onlineworksheetsforkidss.',
      content: `
        <nav><h1>Terms & Conditions</h1></nav>
        <main>
          <h1>Terms & Conditions</h1>
          <p>By using onlineworksheetsforkidss, you agree to our terms of service...</p>
        </main>
      `,
    },
    privacy: {
      title: 'Privacy Policy | onlineworksheetsforkidss',
      description: 'Learn how we protect your data and privacy on onlineworksheetsforkidss.',
      content: `
        <nav><h1>Privacy Policy</h1></nav>
        <main>
          <h1>Privacy Policy</h1>
          <p>We are committed to protecting your privacy...</p>
        </main>
      `,
    },
    writeforus: {
      title: 'Write For Us | Contribute Worksheets | onlineworksheetsforkidss',
      description: 'Interested in contributing? Learn how to write and submit worksheets to onlineworksheetsforkidss.',
      content: `
        <nav><h1>Write For Us</h1></nav>
        <main>
          <h1>Write For Us</h1>
          <p>We welcome contributions from educators and content creators...</p>
        </main>
      `,
    },
    advertise: {
      title: 'Advertise With Us | Partner With onlineworksheetsforkidss',
      description: 'Reach thousands of parents and educators. Learn about advertising opportunities.',
      content: `
        <nav><h1>Advertise With Us</h1></nav>
        <main>
          <h1>Advertising Opportunities</h1>
          <p>Partner with us to reach our audience...</p>
        </main>
      `,
    },
  };

  const pageData = pages[page];
  if (!pageData) {
    return renderHomePage();
  }

  return baseTemplate(pageData.title, pageData.description, pageData.content);
}
