export const initialAppData = {
  profile: {
    partnerOne: 'احمد',
    partnerTwo: 'رورو',
    startDate: '2022-07-11',
    heroQuote: 'كل يوم معاكي هو بداية لقصة عشق جديدة لا تنتهي ❤️',
    heroSubquote: 'هنا نسجل أجمل لحظاتنا ورسائل حبنا الخالدة عبر الزمان',
    adminPin: '1232001',
    enableHearts: true,
    enableMusicAutoPlay: false,
    activeTrackId: '1',
  },
  playlist: [
    {
      id: '1',
      title: 'مقنطع يوتيوب شورتس (YouTube Shorts)',
      artist: 'صوت مخصص من YouTube',
      url: 'https://www.youtube.com/watch?v=y70feYy4MU0&list=RDy70feYy4MU0&start_radio=1',
      coverUrl: 'https://img.youtube.com/vi/rlWelzWJa9c/hqdefault.jpg',
    },
  ],
  memories: [
    {
      id: '1',
      date: '2025-06-7',
      title: 'خطوبتنا',
      description: 'لقد هل طيف رفيقة العمر ف اللهم بارك لنا وبارك علينا واجمع بيننا في خير ♥️♥️',
      imageUrl: 'https://scontent.fcai30-1.fna.fbcdn.net/v/t39.30808-6/506256739_2062503160911319_6432284339688553943_n.jpg?stp=dst-jpg_tt6&cstp=mx1000x1000&ctp=s1000x1000&_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE91qNYJdWRi8qOMeUgEMrhsduBd7ARQjOx24F3sBFCMxNeSsnrnVKmqDCCYub7so2ApLIWHRVbc6cs58X61yE3&_nc_ohc=SoWG1TbqsJwQ7kNvwFRmHLF&_nc_oc=AdpQ-_Bbk2Zx5idxxKyy7zgC3jYAAQmsfpYfAQaE7sSsOiCBDXC-_CM4fIIKYOw1RTU&_nc_zt=23&_nc_ht=scontent.fcai30-1.fna&_nc_gid=ld36q6bHrz6qt47fbuKtUQ&_nc_ss=7b2a8&oh=00_AQEpJeeCUnGumMffOVo2YVoRsDja68DVOEfgNUARyRMzoA&oe=6A740C49',
      category: 'general',
    }
  ],
  upcomingEvents: [
    {
      id: 'e1',
      title: 'ذكرى حبنا السنوية القادمة 🎉',
      targetDate: '2022-07-11',
      description: 'نستعد للرجل الأجمل والاحتفال بمرور سنين من السعادة والحب المتجدد.',
      iconName: 'heart',
    },
    {
      id: 'e2',
      title: 'عيد ميلاد أميرتي الجميلة 🎂',
      targetDate: '2001-03-12T10:00',
      description: 'أجمل يوم في السنة لأن العالم أشرق فيه بوجودك.',
      iconName: 'cake',
    },
    {
      id: 'e3',
      title: 'خطوبتنا اجمل يوم في عمري',
      targetDate: '2025-06-07T10:00',
      description: 'صنع ذكريات جديدة في مكان ساحر نكتشفه سوياً.',
      iconName: 'heart',
    }
  ],
  secretNotes: [
    {
      id: 'sn1',
      title: 'رسالة سرية رقم ١: سر سعادتي',
      content: 'أتساءل دوماً كيف لشخص واحد أن يمتلك قدرة جعل يومي كاملاً سعيداً بابتسامة واحدة فقط.. أنت لستِ مجرد شريكة، أنتِ كل أسباب البهجة في حياتي.',
      category: 'sweet',
    },
    {
      id: 'sn2',
      title: 'رسالة سرية رقم ٢: وعد الأبدية',
      content: 'أوعدك إني هفضل أختادك كل يوم، في كل ظروف ومرحلة، وهكون دايماً السند والظهر والأمان اللي تلجأيلي فيه وقت ما تحتاجي.',
      category: 'promise',
    },
    {
      id: 'sn3',
      title: 'رسالة سرية رقم ٣: عندما تغضبين!',
      content: 'حتى وأنت زعلانة وواخدة جنب بتكوني أرق وأجمل كائن في المجرة.. والتصالح معاكي بوردة وشوكولاتة هو هوايتي المفضلة!',
      category: 'funny',
    },
    {
      id: 'sn4',
      title: 'رسالة سرية رقم ٤: اعتراف غالي',
      content: 'قبل ما أعرفك كنت بظن إن الحب كلام في الروايات.. لكن بعد ما بقيتي في حياتي عرفت إن الواقع مع البنت الصح أجمل بكتير من أعتى الروايات.',
      category: 'deep',
    },
    {
      id: 'sn5',
      title: 'رسالة سرية رقم ٥: أمنياني لكِ',
      content: 'أتمنى لقلبكِ النقي كل السلام، وأتمنى لعينيكِ ألا تدمع إلا من شدة الفرح والضحك.. أحبك جداً.',
      category: 'sweet',
    }
  ],
  dailyMessages: [
    {
      id: 'dm1',
      dayNumber: 1,
      message: 'رسالة اليوم: صباح الخير يا أجمل ما في يومي! خدي بالك من نفسك النهاردة وافتكري دايماً إن فيه حد بيفكر فيكي وبيحبك جداً.',
      hint: 'افتحي الرسالة مع أول كوباية قهوة ☕',
    },
    {
      id: 'dm2',
      dayNumber: 2,
      message: 'رسالة اليوم: ضحكتك هي النغمة المفضلة لقلبي، ما تحرميش العالم من جمالها النهاردة!',
      hint: 'رسالة مخصصة لابتسامتك الساحرة ✨',
    },
    {
      id: 'dm3',
      dayNumber: 3,
      message: 'رسالة اليوم: وجودك بيخلي أصعب الأيام سهلة وبسيطة.. شكراً لأنك نوري وهدوء قلبي.',
      hint: 'طاقة إيجابية ليوم مميز ❤️',
    },
    {
      id: 'dm4',
      dayNumber: 4,
      message: 'رسالة اليوم: مستني اللحظة اللي هنكون فيها سوا عشان أحكيلك قد إيه اشتقتلك من الصبح!',
      hint: 'شوق ومشاعر من القلب 💌',
    },
    {
      id: 'dm5',
      dayNumber: 5,
      message: 'رسالة اليوم: أنتِ الجائزة الكبرى اللي ربنا أنعم عليا بيها.. بحبك النهاردة أكتر من امبارح وأقل من بكرة.',
      hint: 'اعتراف رومانسي هادئ 🌹',
    }
  ]
};
