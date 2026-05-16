const symptomDatabase = {
  // Spine
  'სქოლიოზი': {
    conditions: ['ხერხემლის გამრუდება (სქოლიოზი)'],
    description: 'ხერხემლის გვერდითი გამრუდება',
    recommendation: 'მიმართეთ ორთოპედს. საჭიროა რენტგენი.',
    urgency: 'საშუალო'
  },
  'კიფოზი': {
    conditions: ['ხერხემლის გამრუდება (კიფოზი)'],
    description: 'ხერხემლის წინ გამრუდება - "კეხი"',
    recommendation: 'მიმართეთ ორთოპედს',
    urgency: 'საშუალო'
  },
  'თავის ტკივილი': {
    conditions: ['დაძაბულობის თავის ტკივილი', 'მიგრენა'],
    description: 'ტკივილი თავის არეში',
    recommendation: 'დაისვენეთ, დალიეთ წყალი, მიიღეთ პარაცეტამოლი. მიმართეთ ნევროლოგს.',
    urgency: 'საშუალო'
  },
  'ცხელება': {
    conditions: ['ვირუსული ინფექცია', 'გრიპი'],
    description: 'სხეულის ტემპერატურის მატება',
    recommendation: 'დაისვენეთ, დალიეთ ბევრი სითხე, მიიღეთ სიცხის დამწევი. მიმართეთ თერაპევტს.',
    urgency: 'საშუალო'
  },
  'ხველა': {
    conditions: ['ფარინგიტი', 'ბრონქიტი'],
    description: 'სუნთქვის გზების რეფლექსური გაწმენდა',
    recommendation: 'იყავით თბილად, დალიეთ თბილი სითხეები, იყეფეთ.',
    urgency: 'დაბალი'
  },
  'გულის ტკივილი': {
    conditions: ['კარდიოლოგიური პრობლემა'],
    description: 'ტკივილი გულმკერდის არეში',
    recommendation: '🚨 დაუყოვნებლივ გამოიძახეთ სასწრაფო (112)!',
    urgency: 'მაღალი'
  },
  'მუცლის ტკივილი': {
    conditions: ['კუჭის აშლილობა', 'გასტრიტი'],
    description: 'ტკივილი მუცლის არეში',
    recommendation: 'მიიღეთ მსუბუქი საკვები, დალიეთ წყალი. მიმართეთ გასტროენტეროლოგს.',
    urgency: 'საშუალო'
  },
  'გამონაყარი': {
    conditions: ['ალერგიული რეაქცია', 'ეგზემა'],
    description: 'კანზე გამონაყარი ან სიწითლე',
    recommendation: 'მიმართეთ დერმატოლოგს, მოერიდეთ ალერგენს.',
    urgency: 'დაბალი'
  },
  'ართრიტი': {
    conditions: ['სახსრების ანთება'],
    description: 'სახსრების ტკივილი, შეშუპება',
    recommendation: 'მიმართეთ რევმატოლოგს. გაიკეთეთ სისხლის ანალიზი.',
    urgency: 'საშუალო'
  },
  'დიაბეტი': {
    conditions: ['შაქრიანი დიაბეტი'],
    description: 'სისხლში შაქრის მაღალი დონე',
    recommendation: 'მიმართეთ ენდოკრინოლოგს. გაიკეთეთ სისხლის ანალიზი.',
    urgency: 'საშუალო'
  },
  'მაღალი წნევა': {
    conditions: ['ჰიპერტენზია'],
    description: 'არტერიული წნევის მატება',
    recommendation: 'გაზომეთ წნევა. მიმართეთ კარდიოლოგს.',
    urgency: 'საშუალო'
  },
  'დეპრესია': {
    conditions: ['დეპრესია'],
    description: 'განწყობის დარღვევა, მუდმივი სევდა',
    recommendation: 'ისაუბრეთ ფსიქოლოგთან. მიმართეთ ფსიქიატრს.',
    urgency: 'საშუალო'
  },
  'შფოთვა': {
    conditions: ['შფოთვითი აშლილობა'],
    description: 'გადაჭარბებული ნერვიულობა',
    recommendation: 'ისწავლეთ რელაქსაციის ტექნიკები. მიმართეთ ფსიქოლოგს.',
    urgency: 'დაბალი'
  },
  'ასთმა': {
    conditions: ['ბრონქული ასთმა'],
    description: 'სუნთქვის გზების შევიწროება, ქოშინი',
    recommendation: 'მიმართეთ პულმონოლოგს. გაიკეთეთ სპირომეტრია.',
    urgency: 'საშუალო'
  },
  'მიგრენა': {
    conditions: ['მიგრენა'],
    description: 'ძლიერი, მღელვარე თავის ტკივილი',
    recommendation: 'დაისვენეთ ბნელ ოთახში. მიმართეთ ნევროლოგს.',
    urgency: 'საშუალო'
  },
  'გასტრიტი': {
    conditions: ['გასტრიტი'],
    description: 'კუჭის ლორწოვანის ანთება',
    recommendation: 'მიიღეთ მსუბუქი საკვები. მიმართეთ გასტროენტეროლოგს.',
    urgency: 'საშუალო'
  },
  'აპენდიციტი': {
    conditions: ['აპენდიციტი'],
    description: 'აპენდიქსის ანთება',
    recommendation: '🚨 სასწრაფოდ მიმართეთ ქირურგს!',
    urgency: 'მაღალი'
  }
};

function analyzeSymptoms(symptoms) {
  const lowerSymptoms = symptoms.toLowerCase();
  
  for (const [key, data] of Object.entries(symptomDatabase)) {
    if (lowerSymptoms.includes(key.toLowerCase())) {
      return {
        possibleConditions: [{ name: data.conditions[0], probability: 'მაღალი', description: data.description }],
        recommendation: data.recommendation,
        urgency: data.urgency
      };
    }
  }
  
  return {
    possibleConditions: [],
    recommendation: `❌ "${symptoms}" - ვერ ვიცნობ. სცადეთ: სქოლიოზი, თავის ტკივილი, ცხელება, ხველა, გულის ტკივილი, მუცლის ტკივილი, გამონაყარი, ართრიტი, დიაბეტი, მაღალი წნევა, დეპრესია, ასთმა, მიგრენა, გასტრიტი`,
    urgency: 'დაბალი'
  };
}

module.exports = { analyzeSymptoms };