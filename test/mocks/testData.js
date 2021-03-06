const userDetails = {
  validUser: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'Juliet',
    email: 'gentle883@gmail.com',
    isActive: true,
    password: 'femiok',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  validUserLogin: {
    email: 'email@gmail.com',
    password: 'abcdefgh'
  },
  validUserSignup: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'Juliet',
    isActive: true,
    email: 'gentle8831@gmail.com',
    password: 'femiok',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  validUser1: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'Juliet',
    isActive: true,
    email: 'chidimma@gmail.com',
    password: 'femiok',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  validUserTT: {
    firstName: 'Ben',
    lastName: 'Smith',
    username: 'Juliet',
    isActive: true,
    email: 'chidimma1@gmail.com',
    password: 'femiok',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  spacedField: {
    firstName: '   ',
    lastName: '    ',
    username: 'femi',
    isActive: true,
    email: 'julietezekwe@gmail.com',
    password: 'femi1',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  invalidUser: {
    firstName: '    ',
    lastName: 'Ajibade',
    isActive: true,
    username: 'femi',
    email: 'julietezekwe@gmail.com',
    password: 'femi1',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  invalidUserType: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    isActive: true,
    username: 'femi',
    email: 'julietezekwe@gmail.com',
    password: 'femi1',
    bio: '',
    imgURL: '',
    userType: 'manager',
  },
  invalidUserEmail: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    isActive: true,
    username: 'femi',
    email: 'julietezek',
    password: 'femi',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  validProfile: {
    bio: 'hahh jhvhjv hhv hgghg hhjhhj',
    imgURL: 'hhxvvh.png',
    userType: 'user'
  },
  invalidProfile: {
    bio: 'ok this is good and fine and ok and now its working my bio',
    imgURL: 'good.jpg',
    userType: 'artistsss'
  },
  invalidImage: {
    bio: 'hahh jhvhjv hhv hgghg hhjhhj',
    imgURL: 'hhxvvh.phh',
    userType: 'user'
  },
  invalidBio: {
    bio: 'hahh',
    imgURL: 'hhxvvh.jpeg',
    userType: 'user'
  },
  validArtist: {
    firstName: 'Daniel',
    isActive: true,
    lastName: 'Anyaegbu',
    username: 'Danny',
    email: 'danielchidiebele@gmail.com',
    password: 'qwerty',
    bio: '',
    imgURL: '',
    userType: 'artist',
  },
  validArtist1: {
    firstName: 'Derek',
    lastName: 'Hales',
    username: 'halesBaba',
    email: 'smartwiz14@gmail.com',
    password: 'qwerty',
    bio: '',
    imgURL: '',
    userType: 'artist',
  },
  validArtist2: {
    firstName: 'Scott',
    lastName: 'McCall',
    username: 'scotBaba',
    email: 'danny@gmail.com',
    password: 'qwerty',
    bio: '',
    imgURL: '',
    userType: 'artist',
  },
};

const artDetails = {
  validArticle: {
    title: 'Syntax Podcasts',
    description: 'The Syntax Podcasts isn\'t suitable for all ages',
    categoryId: 1,
    price: 1500.00,
    media: `[{"url":
    "https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",
    "extension":"jpg"}, 
    {"url": 
    "https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",
    "extension":"jpeg"}]`
  },
  validUpdatedArticle: {
    title: 'Syntax Podcasts',
    slug: 'cirrhosis-of-the-sky',
    description: 'The Syntax Podcasts isn\'t suitable for all ages',
    categoryId: 1,
    price: 1500.00,
    media: '[{"url":'
      + '"https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",'
      + '"extension":"jpg"},'
      + '{"url":'
      + '"https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",'
      + '"extension":"jpeg"}]'
  },
  invalidArticle: {
    title: '',
    description: 'The Syntax Podcasts isn\'t suitable for all ages',
    categoryId: 1,
    price: 1500.00,
    media: '[{"url":'
      + '"https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",'
      + '"extension":"jpg"},'
      + '{"url":'
      + '"https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",'
      + '"extension":"jpeg"}]'
  },
  invalidNoMediaArticle: {
    title: 'Cirrhosis of the Sky',
    description: 'The Syntax Podcasts isn\'t suitable for all ages',
    categoryId: 1,
    price: 1500.00,
  },
  invalidUpdatedArticle: {
    title: 'Cirrhosis of the Sky',
    slug: 'cirrhosis-of-the-sky',
    description: 'The ',
    categoryId: 100,
    price: 1500.00,
    media: '[{"url":'
      + '"https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",'
      + '"extension":"jpg"},'
      + '{"url":'
      + '"https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",'
      + '"extension":"jpeg"}]'
  },
  invalidUpdatedArticleCategory: {
    title: 'Cirrhosis of the Sky',
    slug: 'cirrhosis-of-the-sky',
    description: 'To prepare your one sentence, I suggest making a list of all'
      + ' the things you are and do (it may feel silly, ',
    categoryId: 1000,
    price: 1500.00,
    media: '[{"url":'
      + '"https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",'
      + '"extension":"jpg"},'
      + '{"url":'
      + '"https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",'
      + '"extension":"jpeg"}]'
  },
};

const commentDetails = {
  validComment: {
    body: 'this is a good comment'
  },
  invalidComment: {
    body: '  '
  },
};

const reportDetails = {
  admin: {
    email: 'julietezekwe@gmail.com',
    password: 'femiok'
  },
  nonAdmin: {
    email: 'createart@gmail.com',
    password: 'femiok'
  },
  deactivatedUser: {
    email: 'chidimmajuliet89@gmail.com',
    password: 'chidimma'
  }
};

export {
  userDetails,
  artDetails,
  commentDetails,
  reportDetails
};
