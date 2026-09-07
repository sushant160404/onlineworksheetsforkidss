import { WorksheetGame, GradeLevel, Subject, Difficulty, GameType } from '../types';

// Core interactive worksheets and games with curated questions
export const FEATURED_WORKSHEETS: WorksheetGame[] = [
  // --- KINDERGARTEN & PRE-K MATH ---
  {
    id: 'math-k-count-safari',
    title: 'Safari Animal Counting & Quantities',
    slug: 'safari-animal-counting',
    grade: 'Kindergarten',
    subject: 'Math',
    topic: 'Counting 1-20',
    description: 'Count the playful safari animals and tap the matching number or quantity bubble!',
    difficulty: 'Easy',
    gameType: 'bubble_pop',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 1420,
    rating: 4.9,
    iconEmoji: '🦁',
    badgeText: 'Most Popular',
    questions: [
      {
        id: 'q1',
        prompt: 'Count the friendly lions: 🦁 🦁 🦁. How many lions are there?',
        imageEmoji: '🦁🦁🦁',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        explanation: '1, 2, 3! There are exactly 3 lions.',
        hint: 'Touch each lion one by one as you count!'
      },
      {
        id: 'q2',
        prompt: 'Count the playful monkeys: 🐒 🐒 🐒 🐒 🐒. How many monkeys do you see?',
        imageEmoji: '🐒🐒🐒🐒🐒',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
        explanation: 'There are 5 monkeys swinging in the trees!',
        hint: 'Use the fingers on one hand to help you count.'
      },
      {
        id: 'q3',
        prompt: 'Count the giant elephants: 🐘 🐘. How many elephants are there?',
        imageEmoji: '🐘🐘',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        explanation: '1 and 2! Two magnificent elephants.',
        hint: 'A pair means two!'
      },
      {
        id: 'q4',
        prompt: 'Count the tall giraffes: 🦒 🦒 🦒 🦒. How many giraffes are reaching high?',
        imageEmoji: '🦒🦒🦒🦒',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        explanation: 'Four tall giraffes!',
        hint: 'Count: 1, 2, 3, 4!'
      },
      {
        id: 'q5',
        prompt: 'Count the zebras: 🦓. How many zebras are standing here?',
        imageEmoji: '🦓',
        options: ['0', '1', '2', '3'],
        correctAnswer: '1',
        explanation: 'There is only 1 striped zebra!',
        hint: 'Just a single zebra.'
      }
    ]
  },
  {
    id: 'math-1-addition-quest',
    title: 'Magical Addition Forest (Within 20)',
    slug: 'magical-addition-forest',
    grade: '1st Grade',
    subject: 'Math',
    topic: 'Addition',
    description: 'Solve fun addition equations to light up magic crystals in the enchanted forest!',
    difficulty: 'Easy',
    gameType: 'interactive_worksheet',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 2310,
    rating: 4.8,
    iconEmoji: '🍄',
    badgeText: 'Essential Skill',
    questions: [
      {
        id: 'm1',
        prompt: 'What is 5 + 4 = ?',
        imageEmoji: '🍎🍎🍎🍎🍎 + 🍎🍎🍎🍎',
        options: ['7', '8', '9', '10'],
        correctAnswer: '9',
        explanation: '5 plus 4 equals 9!',
        hint: 'Start at 5 and count forward 4 steps: 6, 7, 8, 9.'
      },
      {
        id: 'm2',
        prompt: 'What is 8 + 6 = ?',
        imageEmoji: '⭐',
        options: ['12', '13', '14', '15'],
        correctAnswer: '14',
        explanation: '8 + 6 = 14! (8 + 2 = 10, then + 4 = 14).',
        hint: 'Make a ten first! 8 needs 2 to make 10.'
      },
      {
        id: 'm3',
        prompt: 'What is 7 + 7 = ?',
        imageEmoji: '✨',
        options: ['13', '14', '15', '16'],
        correctAnswer: '14',
        explanation: 'Double 7 is 14!',
        hint: 'Think of the double fact for 7.'
      },
      {
        id: 'm4',
        prompt: 'What is 9 + 8 = ?',
        imageEmoji: '💎',
        options: ['16', '17', '18', '19'],
        correctAnswer: '17',
        explanation: '9 + 8 = 17!',
        hint: '9 is one less than 10. 10 + 8 = 18, minus 1 is 17.'
      },
      {
        id: 'm5',
        prompt: 'If you have 11 acorns and find 5 more, how many do you have in all?',
        imageEmoji: '🌰',
        options: ['15', '16', '17', '18'],
        correctAnswer: '16',
        explanation: '11 + 5 = 16 acorns!',
        hint: 'Add 1 + 5 to get the ones place!'
      }
    ]
  },
  {
    id: 'math-2-subtraction-space',
    title: 'Cosmic Subtraction Blast',
    slug: 'cosmic-subtraction-blast',
    grade: '2nd Grade',
    subject: 'Math',
    topic: 'Subtraction',
    description: 'Fuel your rocket by solving 2-digit subtraction problems without or with regrouping!',
    difficulty: 'Medium',
    gameType: 'interactive_worksheet',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 1890,
    rating: 4.7,
    iconEmoji: '🚀',
    badgeText: 'Top Rated',
    questions: [
      {
        id: 's1',
        prompt: 'What is 28 - 14 = ?',
        options: ['12', '14', '16', '18'],
        correctAnswer: '14',
        explanation: '28 - 14 = 14. 8 - 4 = 4, and 2 - 1 = 1.',
        hint: 'Subtract the ones first: 8 - 4.'
      },
      {
        id: 's2',
        prompt: 'What is 45 - 20 = ?',
        options: ['20', '25', '30', '35'],
        correctAnswer: '25',
        explanation: '45 - 20 = 25. Subtract 2 tens from 4 tens!',
        hint: 'Taking away 20 means going down two tens.'
      },
      {
        id: 's3',
        prompt: 'What is 52 - 18 = ?',
        options: ['34', '36', '44', '24'],
        correctAnswer: '34',
        explanation: '52 - 18 = 34. Regroup 1 ten to make 12 - 8 = 4, then 4 tens - 1 ten = 3 tens.',
        hint: 'You cannot do 2 - 8 directly, borrow a ten!'
      },
      {
        id: 's4',
        prompt: 'A spaceship has 60 fuel units and uses 25 units. How much fuel remains?',
        options: ['25', '35', '40', '45'],
        correctAnswer: '35',
        explanation: '60 - 25 = 35 fuel units remaining!',
        hint: '60 - 20 = 40, and 40 - 5 = 35.'
      },
      {
        id: 's5',
        prompt: 'What is 100 - 37 = ?',
        options: ['63', '67', '73', '53'],
        correctAnswer: '63',
        explanation: '100 - 37 = 63!',
        hint: '100 - 30 = 70, then 70 - 7 = 63.'
      }
    ]
  },
  {
    id: 'math-3-multiplication-arcade',
    title: 'Multiplication Monster Munch',
    slug: 'multiplication-monster-munch',
    grade: '3rd Grade',
    subject: 'Math',
    topic: 'Multiplication Tables',
    description: 'Feed friendly monsters by multiplying numbers rapidly before the timer expires!',
    difficulty: 'Medium',
    gameType: 'bubble_pop',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 3120,
    rating: 4.9,
    iconEmoji: '👾',
    badgeText: 'Kids Favorite',
    questions: [
      {
        id: 'x1',
        prompt: 'What is 6 × 7 = ?',
        options: ['36', '42', '48', '49'],
        correctAnswer: '42',
        explanation: '6 × 7 = 42! Six groups of seven make 42.',
        hint: '6 × 6 = 36, add 6 more.'
      },
      {
        id: 'x2',
        prompt: 'What is 8 × 8 = ?',
        options: ['56', '62', '64', '72'],
        correctAnswer: '64',
        explanation: '8 × 8 = 64! I ate and ate until I got sick on the floor, eight times eight is sixty-four!',
        hint: 'Rhyme trick: 8 and 8 fell on the floor, picked it up it was 64.'
      },
      {
        id: 'x3',
        prompt: 'What is 9 × 4 = ?',
        options: ['27', '32', '36', '45'],
        correctAnswer: '36',
        explanation: '9 × 4 = 36!',
        hint: '10 × 4 = 40, subtract 4.'
      },
      {
        id: 'x4',
        prompt: 'There are 5 boxes with 9 shiny gems in each box. How many gems in total?',
        options: ['40', '45', '50', '54'],
        correctAnswer: '45',
        explanation: '5 × 9 = 45 gems!',
        hint: 'Count by 5s nine times.'
      },
      {
        id: 'x5',
        prompt: 'What is 12 × 5 = ?',
        options: ['50', '55', '60', '65'],
        correctAnswer: '60',
        explanation: '12 × 5 = 60 minutes in an hour!',
        hint: '10 × 5 = 50, plus 2 × 5 = 10.'
      }
    ]
  },
  {
    id: 'math-4-fractions-pizza',
    title: 'Pizza Party Fractions & Decimals',
    slug: 'pizza-party-fractions',
    grade: '4th Grade',
    subject: 'Math',
    topic: 'Fractions',
    description: 'Slice and serve delicious pizzas to understand equivalent fractions and halves!',
    difficulty: 'Medium',
    gameType: 'interactive_worksheet',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 2150,
    rating: 4.8,
    iconEmoji: '🍕',
    badgeText: 'Visual Learning',
    questions: [
      {
        id: 'f1',
        prompt: 'Which fraction is equivalent to 1/2?',
        options: ['2/3', '2/4', '3/5', '1/4'],
        correctAnswer: '2/4',
        explanation: '2/4 equals 1/2 because both the numerator and denominator are divided by 2.',
        hint: 'If you cut each half into two slices, you get 2 out of 4!'
      },
      {
        id: 'f2',
        prompt: 'A pizza is cut into 8 equal slices. Lily ate 3 slices. What fraction did she eat?',
        options: ['3/5', '3/8', '5/8', '8/3'],
        correctAnswer: '3/8',
        explanation: 'She ate 3 parts out of 8 total parts, which is 3/8.',
        hint: 'Numerator = parts eaten, Denominator = total slices.'
      },
      {
        id: 'f3',
        prompt: 'Which fraction is larger: 3/4 or 1/4?',
        options: ['1/4', '3/4', 'They are equal', 'Cannot tell'],
        correctAnswer: '3/4',
        explanation: 'When denominators are the same, compare numerators: 3 is greater than 1, so 3/4 is larger.',
        hint: 'Having 3 pieces of pie is more than having 1 piece of pie!'
      },
      {
        id: 'f4',
        prompt: 'What is 2/5 + 1/5 = ?',
        options: ['3/10', '3/5', '2/25', '1/5'],
        correctAnswer: '3/5',
        explanation: 'Add numerators: 2 + 1 = 3. The denominator stays 5, so 3/5.',
        hint: 'Keep the bottom number the same and add the tops.'
      },
      {
        id: 'f5',
        prompt: 'What is 0.5 written as a simple fraction?',
        options: ['1/5', '1/2', '5/100', '2/5'],
        correctAnswer: '1/2',
        explanation: '0.5 means 5 tenths (5/10), which simplifies to 1/2!',
        hint: 'Half of one dollar is 50 cents (0.50).'
      }
    ]
  },

  // --- LANGUAGE ARTS & PHONICS ---
  {
    id: 'la-k-phonics-rhyme',
    title: 'Rhyme Time Carnival & Sight Words',
    slug: 'rhyme-time-carnival',
    grade: 'Kindergarten',
    subject: 'Language Arts',
    topic: 'Phonics & Rhymes',
    description: 'Find words that sound alike and pop balloons at the phonics carnival!',
    difficulty: 'Easy',
    gameType: 'word_builder',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 2780,
    rating: 4.9,
    iconEmoji: '🎪',
    badgeText: 'Phonics Core',
    questions: [
      {
        id: 'r1',
        prompt: 'Which word rhymes with CAT? 🐱',
        options: ['DOG', 'HAT', 'CUP', 'SUN'],
        correctAnswer: 'HAT',
        explanation: 'CAT and HAT both end with the "-at" sound!',
        hint: 'Listen to the ending sound: c-AT, h-AT!'
      },
      {
        id: 'r2',
        prompt: 'Which word rhymes with FROG? 🐸',
        options: ['LOG', 'PIG', 'FOX', 'BIRD'],
        correctAnswer: 'LOG',
        explanation: 'FROG and LOG both end with "-og"!',
        hint: 'A frog sitting on a green ___!'
      },
      {
        id: 'r3',
        prompt: 'Which word rhymes with STAR? ⭐',
        options: ['MOON', 'CAR', 'SKY', 'TREE'],
        correctAnswer: 'CAR',
        explanation: 'STAR and CAR both end in "-ar"!',
        hint: 'Twinkle twinkle little star, driving in a shiny ___!'
      },
      {
        id: 'r4',
        prompt: 'What is the beginning sound of SUN? ☀️',
        options: ['S', 'B', 'M', 'T'],
        correctAnswer: 'S',
        explanation: 'SUN starts with the letter S ("sss") sound!',
        hint: 'Like a snake saying sssss.'
      },
      {
        id: 'r5',
        prompt: 'Pick the sight word spelled correctly: "The ball is ___ (b-i-g)".',
        options: ['BIG', 'BGI', 'DIG', 'PIG'],
        correctAnswer: 'BIG',
        explanation: 'B - I - G spells BIG!',
        hint: 'B-I-G.'
      }
    ]
  },
  {
    id: 'la-1-spelling-safari',
    title: 'Word Wizard Spelling Safari',
    slug: 'word-wizard-spelling',
    grade: '1st Grade',
    subject: 'Language Arts',
    topic: 'Spelling & Vocabulary',
    description: 'Assemble letter tiles to spell everyday animal words and unlock secret treasure chests!',
    difficulty: 'Easy',
    gameType: 'word_builder',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 3410,
    rating: 4.9,
    iconEmoji: '🪄',
    badgeText: 'Interactive Builder',
    questions: [
      {
        id: 'w1',
        prompt: 'Spell the word for this furry animal: 🐶 (D-O-G)',
        options: ['DOG', 'GOD', 'DGO', 'DUG'],
        correctAnswer: 'DOG',
        explanation: 'D - O - G spells DOG!',
        hint: 'Begins with D, ends with G.'
      },
      {
        id: 'w2',
        prompt: 'Which word completes the sentence: "The bird can ___ in the blue sky."',
        options: ['FLY', 'FRY', 'CRY', 'DRY'],
        correctAnswer: 'FLY',
        explanation: 'Birds have wings to FLY!',
        hint: 'F - L - Y.'
      },
      {
        id: 'w3',
        prompt: 'Spell the color of grass: 🟢',
        options: ['GREEN', 'GEERN', 'GREN', 'GREAN'],
        correctAnswer: 'GREEN',
        explanation: 'G-R-E-E-N spells GREEN!',
        hint: 'It has two Es in the middle.'
      },
      {
        id: 'w4',
        prompt: 'What is the opposite of COLD?',
        options: ['HOT', 'WARM', 'COOL', 'ICE'],
        correctAnswer: 'HOT',
        explanation: 'The opposite of cold is HOT!',
        hint: 'A warm fire is very ___.'
      },
      {
        id: 'w5',
        prompt: 'Identify the vowel in the word: CAT',
        options: ['C', 'A', 'T', 'None'],
        correctAnswer: 'A',
        explanation: 'A is a vowel! The vowels are A, E, I, O, U.',
        hint: 'The vowels are A, E, I, O, U.'
      }
    ]
  },
  {
    id: 'la-2-parts-of-speech',
    title: 'Grammar Island: Nouns, Verbs & Adjectives',
    slug: 'grammar-island-parts-of-speech',
    grade: '2nd Grade',
    subject: 'Language Arts',
    topic: 'Parts of Speech',
    description: 'Classify words into nouns (naming words), verbs (action words), and adjectives (describing words)!',
    difficulty: 'Medium',
    gameType: 'interactive_worksheet',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 2240,
    rating: 4.8,
    iconEmoji: '🏝️',
    badgeText: 'Grammar Champ',
    questions: [
      {
        id: 'g1',
        prompt: 'Which word is a NOUN (person, place, or thing)? "The playful dog ran outside."',
        options: ['dog', 'playful', 'ran', 'outside'],
        correctAnswer: 'dog',
        explanation: '"Dog" is an animal/thing, which makes it a noun!',
        hint: 'A noun names a person, place, or thing.'
      },
      {
        id: 'g2',
        prompt: 'Which word is a VERB (action word)? "Sam jumps over the puddles."',
        options: ['Sam', 'jumps', 'puddles', 'over'],
        correctAnswer: 'jumps',
        explanation: '"Jumps" is an action that someone does, so it is a verb!',
        hint: 'What action is Sam doing?'
      },
      {
        id: 'g3',
        prompt: 'Which word is an ADJECTIVE (describing word)? "Emily wore a bright yellow raincoat."',
        options: ['Emily', 'yellow', 'wore', 'raincoat'],
        correctAnswer: 'yellow',
        explanation: '"Yellow" describes what the raincoat looks like!',
        hint: 'Which word describes the color or quality?'
      },
      {
        id: 'g4',
        prompt: 'What kind of sentence needs a question mark (?) at the end?',
        options: ['An asking question', 'A telling sentence', 'A quiet command', 'An exclamation'],
        correctAnswer: 'An asking question',
        explanation: 'Questions always end with a question mark (?)!',
        hint: '"Where is my backpack?" is a question.'
      },
      {
        id: 'g5',
        prompt: 'What is the plural form of the noun "BOX"?',
        options: ['BOXES', 'BOXS', 'BOXIES', 'BOXZ'],
        correctAnswer: 'BOXES',
        explanation: 'Words ending in -x take -es to form plurals: BOXES!',
        hint: 'Add -es to words ending in x.'
      }
    ]
  },

  // --- SCIENCE LAB EXPLORERS ---
  {
    id: 'sci-k-living-things',
    title: 'Living vs Non-Living Lab',
    slug: 'living-vs-non-living',
    grade: 'Kindergarten',
    subject: 'Science',
    topic: 'Living Things',
    description: 'Investigate what living things need to grow, eat, breathe, and survive on Earth!',
    difficulty: 'Easy',
    gameType: 'interactive_worksheet',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 2010,
    rating: 4.9,
    iconEmoji: '🌱',
    badgeText: 'STEM Explorer',
    questions: [
      {
        id: 'sc1',
        prompt: 'Which of these is a LIVING thing?',
        imageEmoji: '🌻 🪨 🚗 🧸',
        options: ['Sunflower 🌻', 'Rock 🪨', 'Toy Car 🚗', 'Teddy Bear 🧸'],
        correctAnswer: 'Sunflower 🌻',
        explanation: 'A sunflower is a plant that drinks water and grows towards sunlight!',
        hint: 'Which one grows and needs water?'
      },
      {
        id: 'sc2',
        prompt: 'What do plants need to grow healthy and strong?',
        options: ['Sunlight, water, and soil', 'Soda and candy', 'Dark closets and cold ice', 'Pencils and paper'],
        correctAnswer: 'Sunlight, water, and soil',
        explanation: 'Plants need sunlight, fresh water, and nutrient-rich soil!',
        hint: 'Think about sunshine and rain.'
      },
      {
        id: 'sc3',
        prompt: 'Which animal lives and breathes underwater using gills?',
        options: ['Fish 🐟', 'Eagle 🦅', 'Tiger 🐅', 'Rabbit 🐇'],
        correctAnswer: 'Fish 🐟',
        explanation: 'Fish have gills that allow them to breathe oxygen in water!',
        hint: 'It swims in rivers and oceans.'
      },
      {
        id: 'sc4',
        prompt: 'What season comes after Winter when flowers start to bloom?',
        options: ['Spring', 'Summer', 'Autumn', 'Snow season'],
        correctAnswer: 'Spring',
        explanation: 'Spring brings warmer days, gentle rain showers, and blooming buds!',
        hint: 'Flowers spring up in this season!'
      },
      {
        id: 'sc5',
        prompt: 'Which sense do we use to listen to music and bird songs?',
        options: ['Hearing (Ears) 👂', 'Smell (Nose) 👃', 'Taste (Tongue) 👅', 'Sight (Eyes) 👁️'],
        correctAnswer: 'Hearing (Ears) 👂',
        explanation: 'Our ears allow us to hear sound vibrations!',
        hint: 'What do you wear headphones on?'
      }
    ]
  },
  {
    id: 'sci-2-solar-system',
    title: 'Solar System Planetary Voyage',
    slug: 'solar-system-voyage',
    grade: '2nd Grade',
    subject: 'Science',
    topic: 'Space & Planets',
    description: 'Travel through outer space and discover the Sun, rocky planets, gas giants, and the Moon!',
    difficulty: 'Medium',
    gameType: 'interactive_worksheet',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 2950,
    rating: 4.9,
    iconEmoji: '🪐',
    badgeText: 'Science Adventure',
    questions: [
      {
        id: 'sp1',
        prompt: 'Which planet is known as the "Red Planet"?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
        explanation: 'Mars appears red because of iron oxide (rust) covering its dusty rocky surface!',
        hint: 'Named after the Roman god, rover Perseverance explores it.'
      },
      {
        id: 'sp2',
        prompt: 'What is at the very center of our Solar System that gives us light and warmth?',
        options: ['The Sun ☀️', 'The Earth 🌍', 'The Moon 🌙', 'The North Star ⭐'],
        correctAnswer: 'The Sun ☀️',
        explanation: 'The Sun is a giant luminous star at the center of our solar system!',
        hint: 'It rises in the east every morning.'
      },
      {
        id: 'sp3',
        prompt: 'Which planet is famous for having beautiful, bright rings around it?',
        options: ['Saturn 🪐', 'Neptune', 'Mercury', 'Earth'],
        correctAnswer: 'Saturn 🪐',
        explanation: 'Saturn has spectacular rings made of billions of chunks of ice and rock!',
        hint: 'Look for the planet with rings in emoji form 🪐.'
      },
      {
        id: 'sp4',
        prompt: 'How long does it take for Earth to orbit (travel around) the Sun once?',
        options: ['1 Year (365 days)', '1 Month (30 days)', '24 Hours', '10 Years'],
        correctAnswer: '1 Year (365 days)',
        explanation: 'Earth completes one full trip around the Sun every 365 days (1 year)!',
        hint: 'You celebrate a birthday every time this happens.'
      },
      {
        id: 'sp5',
        prompt: 'What is the largest planet in our entire Solar System?',
        options: ['Jupiter', 'Earth', 'Uranus', 'Mars'],
        correctAnswer: 'Jupiter',
        explanation: 'Jupiter is a massive gas giant with the famous Great Red Spot storm!',
        hint: 'Over 1,300 Earths could fit inside it!'
      }
    ]
  },

  // --- TYPING GAMES ---
  {
    id: 'type-speedster-racer',
    title: 'Speedy Nitro Keyboard Racer',
    slug: 'speedy-nitro-typing-racer',
    grade: '1st Grade',
    subject: 'Typing',
    topic: 'Home Row & Keys',
    description: 'Type words accurately to boost your race car across the finish line and boost your WPM!',
    difficulty: 'Easy',
    gameType: 'speed_typing',
    questionsCount: 5,
    isPrintable: false,
    playsCount: 4520,
    rating: 4.9,
    iconEmoji: '🏎️',
    badgeText: 'Fast & Fun',
    questions: [
      {
        id: 't1',
        prompt: 'Type the word: STAR',
        correctAnswer: 'star',
        explanation: 'Great job typing STAR!',
        hint: 'Find S-T-A-R on your keyboard.'
      },
      {
        id: 't2',
        prompt: 'Type the word: ZOOM',
        correctAnswer: 'zoom',
        explanation: 'Vroom! Fast fingers on ZOOM.',
        hint: 'Z-O-O-M.'
      },
      {
        id: 't3',
        prompt: 'Type the word: QUICK',
        correctAnswer: 'quick',
        explanation: 'Super quick typing!',
        hint: 'Q-U-I-C-K.'
      },
      {
        id: 't4',
        prompt: 'Type the word: TURTLE',
        correctAnswer: 'turtle',
        explanation: 'You typed TURTLE like a champion!',
        hint: 'T-U-R-T-L-E.'
      },
      {
        id: 't5',
        prompt: 'Type the word: WINNER',
        correctAnswer: 'winner',
        explanation: 'First place across the finish line!',
        hint: 'W-I-N-N-E-R.'
      }
    ]
  },
  {
    id: 'type-galaxy-explorer',
    title: 'Galaxy Space Typing Patrol',
    slug: 'galaxy-space-typing',
    grade: '3rd Grade',
    subject: 'Typing',
    topic: 'Speed & Finger Agility',
    description: 'Defend planet Earth by typing words to charge cosmic defense shields!',
    difficulty: 'Medium',
    gameType: 'speed_typing',
    questionsCount: 5,
    isPrintable: false,
    playsCount: 3870,
    rating: 4.8,
    iconEmoji: '🛸',
    badgeText: 'Arcade Challenge',
    questions: [
      {
        id: 'gt1',
        prompt: 'Type the word: PLANET',
        correctAnswer: 'planet',
        explanation: 'Shield charged with PLANET!',
        hint: 'P-L-A-N-E-T'
      },
      {
        id: 'gt2',
        prompt: 'Type the word: ROCKET',
        correctAnswer: 'rocket',
        explanation: 'Thrusters engaged!',
        hint: 'R-O-C-K-E-T'
      },
      {
        id: 'gt3',
        prompt: 'Type the word: COMET',
        correctAnswer: 'comet',
        explanation: 'Blazing through the asteroid belt!',
        hint: 'C-O-M-E-T'
      },
      {
        id: 'gt4',
        prompt: 'Type the word: ASTRONAUT',
        correctAnswer: 'astronaut',
        explanation: 'Stellar spelling!',
        hint: 'A-S-T-R-O-N-A-U-T'
      },
      {
        id: 'gt5',
        prompt: 'Type the word: EXPLORE',
        correctAnswer: 'explore',
        explanation: 'Mission accomplished!',
        hint: 'E-X-P-L-O-R-E'
      }
    ]
  },

  // --- LOGIC & PUZZLES ---
  {
    id: 'logic-k-patterns',
    title: 'Pattern Detective & Shape Sequences',
    slug: 'pattern-detective-shapes',
    grade: 'Kindergarten',
    subject: 'Logic & Puzzles',
    topic: 'Patterns & Sequences',
    description: 'What comes next in the sequence? Find the missing shape or color to crack the puzzle code!',
    difficulty: 'Easy',
    gameType: 'interactive_worksheet',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 1650,
    rating: 4.8,
    iconEmoji: '🧩',
    badgeText: 'Brain Booster',
    questions: [
      {
        id: 'p1',
        prompt: 'What comes next? 🔴 🔵 🔴 🔵 🔴 ___',
        options: ['🔵 (Blue)', '🔴 (Red)', '🟢 (Green)', '🟡 (Yellow)'],
        correctAnswer: '🔵 (Blue)',
        explanation: 'The pattern alternates: Red, Blue, Red, Blue, Red, Blue!',
        hint: 'Look at the AB repeating pattern.'
      },
      {
        id: 'p2',
        prompt: 'What comes next? ⭐ 🌙 ⭐ 🌙 ⭐ ___',
        options: ['🌙 (Moon)', '⭐ (Star)', '☀️ (Sun)', '☁️ (Cloud)'],
        correctAnswer: '🌙 (Moon)',
        explanation: 'Star, Moon, Star, Moon, Star, Moon!',
        hint: 'Say the shapes out loud to hear the rhythm.'
      },
      {
        id: 'p3',
        prompt: 'Which shape has 3 sides and 3 corners?',
        options: ['Triangle 🔺', 'Square 🟦', 'Circle 🔴', 'Rectangle 🟨'],
        correctAnswer: 'Triangle 🔺',
        explanation: 'Triangles always have exactly 3 sides and 3 vertices (corners)!',
        hint: 'Tri- means three, like a tricycle.'
      },
      {
        id: 'p4',
        prompt: 'What comes next? 🍎 🍌 🍎 🍌 🍎 ___',
        options: ['🍌 (Banana)', '🍎 (Apple)', '🍇 (Grapes)', '🍊 (Orange)'],
        correctAnswer: '🍌 (Banana)',
        explanation: 'Apple, Banana, Apple, Banana, Apple, Banana!',
        hint: 'Which fruit was after the first apple?'
      },
      {
        id: 'p5',
        prompt: 'If an ice cube is put in the warm sun, what happens to it?',
        options: ['It melts into water', 'It turns into stone', 'It grows bigger', 'Nothing happens'],
        correctAnswer: 'It melts into water',
        explanation: 'Heat warms the solid ice and melts it into liquid water!',
        hint: 'Ice cream and ice melt when it gets warm.'
      }
    ]
  },
  {
    id: 'logic-3-brain-teasers',
    title: 'Secret Agent Code Breaker & Math Riddles',
    slug: 'secret-agent-code-breaker',
    grade: '3rd Grade',
    subject: 'Logic & Puzzles',
    topic: 'Deductive Reasoning',
    description: 'Use clever clues and logic grids to uncover secret animal secret agents and solve mysteries!',
    difficulty: 'Hard',
    gameType: 'interactive_worksheet',
    questionsCount: 5,
    isPrintable: true,
    playsCount: 2190,
    rating: 4.9,
    iconEmoji: '🕵️',
    badgeText: 'Genius Level',
    questions: [
      {
        id: 'cr1',
        prompt: 'I am an odd number between 20 and 30. My digits sum up to 8. What number am I?',
        options: ['25', '26', '27', '29'],
        correctAnswer: '27',
        explanation: '2 + 7 = 8, and 27 is an odd number between 20 and 30!',
        hint: 'Check 2 + 5 = 7, 2 + 7 = 8!'
      },
      {
        id: 'cr2',
        prompt: 'If all Zips are Zaps, and all Zaps are Zooms, are all Zips definitely Zooms?',
        options: ['Yes, always', 'No, never', 'Only on Tuesdays', 'Cannot be determined'],
        correctAnswer: 'Yes, always',
        explanation: 'Since every Zip is inside Zaps, and every Zap is inside Zooms, all Zips are inside Zooms (Transitive Property)!',
        hint: 'Think: All dogs are mammals, all mammals are animals.'
      },
      {
        id: 'cr3',
        prompt: 'A farmer has 17 sheep. All but 9 run away. How many sheep does he have left?',
        options: ['9', '8', '17', '0'],
        correctAnswer: '9',
        explanation: '"All but 9 run away" means 9 remained with the farmer!',
        hint: 'Read carefully: "all BUT nine".'
      },
      {
        id: 'cr4',
        prompt: 'What number should replace the question mark? 2, 4, 8, 16, ?',
        options: ['32', '24', '30', '64'],
        correctAnswer: '32',
        explanation: 'Each number is multiplied by 2 (doubled): 16 × 2 = 32!',
        hint: 'Double the previous number.'
      },
      {
        id: 'cr5',
        prompt: 'Which weighs more: a pound of feathers or a pound of bricks?',
        options: ['They weigh the exact same', 'The bricks', 'The feathers', 'Depends on gravity'],
        correctAnswer: 'They weigh the exact same',
        explanation: 'Both weigh exactly ONE pound!',
        hint: 'Look at the unit: one pound is equal to one pound.'
      }
    ]
  }
];

// Helper to generate a full catalog of 1,000+ worksheets across grades and subjects
// to provide TurtleDiary scale exploration, filtering, search, and printable access!
export function generateFullCatalog(): WorksheetGame[] {
  const list: WorksheetGame[] = [...FEATURED_WORKSHEETS];

  const grades: GradeLevel[] = ['Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];
  const subjects: Subject[] = ['Math', 'Language Arts', 'Science', 'Typing', 'Logic & Puzzles', 'Creative Arts'];
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  const topicsBySubject: Record<Subject, string[]> = {
    'Math': [
      'Counting & Cardinality', 'Addition Facts', 'Subtraction Battles', 'Multiplication Tables',
      'Division Quests', 'Fractions & Decimals', 'Place Value & Rounding', 'Geometry & Angles',
      'Measurement & Telling Time', 'Money Math & Coins', 'Word Problems', 'Algebraic Patterns'
    ],
    'Language Arts': [
      'Phonics & Rhymes', 'Sight Words Mastery', 'Spelling Sprint', 'Nouns & Verbs',
      'Adjectives & Adverbs', 'Reading Comprehension', 'Sentence Structure', 'Punctuation & Capitalization',
      'Vocabulary Expansion', 'Story Sequencing', 'Synonyms & Antonyms', 'Prefixes & Suffixes'
    ],
    'Science': [
      'Living vs Non-Living', 'Plants & Photosynthesis', 'Animals & Habitats', 'Weather & Seasons',
      'Solar System & Planets', 'Water Cycle & Earth', 'Forces & Motion', 'Human Body Systems',
      'States of Matter', 'Ecosystems & Food Webs', 'Sound & Light Energy', 'Simple Machines'
    ],
    'Typing': [
      'Home Row Keys (ASDF JKL;)', 'Top Row Keys (QWERTY)', 'Bottom Row (ZXCVBNM)', 'Number Row Mastery',
      'Capital Letters & Shift', 'Punctuation Typing', 'Speed Typing Sprint', 'Paragraph Word Racer',
      'Accuracy Boost Drills', 'Code Typing for Kids', 'Space Cadet Typer', 'Keyboard Ninja'
    ],
    'Logic & Puzzles': [
      'Pattern Sequences', 'Memory Tile Match', 'Maze Pathfinder', 'Sudoku for Kids',
      'Tangram Builder', 'Spot the Difference', 'Deductive Riddles', 'Odd One Out',
      'Color Sequence Coding', 'Spatial Block Rotation', 'Grid Coordinate Hunt', 'Logical Word Chains'
    ],
    'Creative Arts': [
      'Color by Numbers', 'Pixel Art Builder', 'Music Rhythm Beats', 'Drawing Line Challenges',
      'Symmetry Painting', 'Creative Story Starter', 'Emoji Story Match', 'Origami Craft Guide'
    ]
  };

  const emojisBySubject: Record<Subject, string[]> = {
    'Math': ['🔢', '➕', '➖', '✖️', '➗', '📐', '⏰', '🪙', '📊', '🧮'],
    'Language Arts': ['📚', '📖', '✍️', '🔤', '🗣️', '📝', '🎪', '🪄', '🔠', '🎨'],
    'Science': ['🔬', '🧪', '🪐', '🌱', '🦖', '🌋', '☀️', '🌊', '🧬', '🌍'],
    'Typing': ['⌨️', '🏎️', '🚀', '⚡', '🛸', '🎯', '🏁', '💻', '🎮', '💨'],
    'Logic & Puzzles': ['🧩', '🕵️', '🎲', '🧠', '🔍', '💡', '🤖', '🗝️', '♟️', '🎯'],
    'Creative Arts': ['🎨', '🖌️', '🌈', '🎭', '🎵', '✨', '🖍️', '🧁', '🎡', '🌟']
  };

  let count = list.length;
  const targetCount = 1008; // 1000+ catalog!

  // Deterministic procedural generation so catalog is consistent across reloads
  for (let i = count; i < targetCount; i++) {
    const grade = grades[i % grades.length];
    const subject = subjects[(i * 3) % subjects.length];
    const topics = topicsBySubject[subject];
    const topic = topics[i % topics.length];
    const difficulty = difficulties[(i + 1) % difficulties.length];
    const emojiList = emojisBySubject[subject];
    const iconEmoji = emojiList[i % emojiList.length];

    let gameType: GameType = 'interactive_worksheet';
    if (subject === 'Typing') gameType = 'speed_typing';
    else if (i % 4 === 0) gameType = 'bubble_pop';
    else if (subject === 'Language Arts' && i % 3 === 0) gameType = 'word_builder';

    const sampleNumberA = (i % 12) + 2;
    const sampleNumberB = (i % 9) + 1;
    const sumResult = sampleNumberA + sampleNumberB;
    const prodResult = sampleNumberA * sampleNumberB;

    const sampleQuestions = [
      {
        id: `gen-${i}-q1`,
        prompt: subject === 'Math'
          ? `Solve the challenge: What is ${sampleNumberA} + ${sampleNumberB} = ?`
          : subject === 'Science'
          ? `In ${topic}, which of these is correct?`
          : subject === 'Typing'
          ? `Type the target word: SPEED`
          : `Select the best matching answer for ${topic}:`,
        options: subject === 'Math'
          ? [`${sumResult}`, `${sumResult + 2}`, `${Math.max(1, sumResult - 3)}`, `${sumResult + 5}`]
          : ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
        correctAnswer: subject === 'Math' ? `${sumResult}` : (subject === 'Typing' ? 'speed' : 'Option A (Correct)'),
        explanation: `Great job mastering ${topic} for ${grade}!`,
        hint: `Think carefully about the key rule of ${topic}.`
      },
      {
        id: `gen-${i}-q2`,
        prompt: subject === 'Math'
          ? `Multiplication practice: What is ${sampleNumberA} × 2 = ?`
          : `Identify the true statement about ${topic}:`,
        options: subject === 'Math'
          ? [`${sampleNumberA * 2}`, `${sampleNumberA * 2 + 3}`, `${sampleNumberA * 2 - 2}`, `${sampleNumberA * 2 + 10}`]
          : ['Correct Fact', 'Incorrect Choice', 'Distractor Fact', 'Wrong Statement'],
        correctAnswer: subject === 'Math' ? `${sampleNumberA * 2}` : 'Correct Fact',
        explanation: `Excellent work!`,
        hint: `Review your knowledge of ${grade} ${subject}.`
      },
      {
        id: `gen-${i}-q3`,
        prompt: `Question 3 on ${topic}: Can you solve this puzzle?`,
        options: ['Star Answer', 'Cloud Answer', 'Moon Answer', 'Sun Answer'],
        correctAnswer: 'Star Answer',
        explanation: `You are becoming a true master!`,
        hint: `Follow the pattern.`
      }
    ];

    list.push({
      id: `wk-${i + 1}`,
      title: `${topic} - Level ${Math.floor(i / 15) + 1}`,
      slug: `${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i + 1}`,
      grade,
      subject,
      topic,
      description: `Interactive learning worksheet game covering ${topic} tailored for ${grade} students with instant automated grading and stars.`,
      difficulty,
      gameType,
      questionsCount: sampleQuestions.length,
      isPrintable: true,
      playsCount: Math.floor(500 + ((i * 37) % 4500)),
      rating: +(4.5 + ((i % 5) * 0.1)).toFixed(1),
      iconEmoji,
      badgeText: i % 7 === 0 ? 'Featured' : (i % 11 === 0 ? 'New' : undefined),
      questions: sampleQuestions
    });
  }

  return list;
}

export const ALL_WORKSHEETS: WorksheetGame[] = generateFullCatalog();
