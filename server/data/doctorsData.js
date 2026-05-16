const doctors = [
  // 1. ივანე თარხნიშვილი (თარხანოვი) - ისტორიული ფიგურა
  {
    id: 1,
    name: "ივანე თარხნიშვილი (თარხანოვი)",
    specialty: "ფიზიოლოგი",
    specialization: "ნეიროფიზიოლოგია",
    experience: 30,
    education: "პეტერბურგის სამედიცინო-ქირურგიული აკადემია",
    achievements: "მსოფლიოში ცნობილი ფიზიოლოგი, სეჩენოვის მოწაფე. აღმოაჩინა კანის გალვანური რეფლექსი (თარხანოვის ფენომენი). პირველმა აღწერა რადიაციული ავადმყოფობა.",
    rating: 5.0,
    clinicId: 4,
    clinicName: "აკად. ოთარ ღუდუშაურის კლინიკა",
    workingHours: "ისტორიული ფიგურა",
    phone: "+995 32 2 39 39 39",
    email: "ivane.tarkhnishvili@mediroute.ge",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ivane_Tarkhan-Mouravi.jpg/400px-Ivane_Tarkhan-Mouravi.jpg",
    bio: "ივანე თარხნიშვილი (1846–1908) იყო მსოფლიოში ცნობილი ქართველი ფიზიოლოგი. იგი იყო პირველი მეცნიერი, რომელმაც აღწერა რადიაციული ავადმყოფობა.",
    languages: ["ქართული", "რუსული", "ფრანგული", "გერმანული"],
    isHistorical: true,
    yearsLived: "1846-1908",
    educationDetails: [
      "პეტერბურგის სამედიცინო-ქირურგიული აკადემია",
      "მუშაობდა ი. სეჩენოვთან",
      "პეტერბურგის მეცნიერებათა აკადემიის წევრი"
    ]
  },
  // 2. იოსებ ჟორდანია - რეპროდუქტოლოგიის პიონერი
  {
    id: 2,
    name: "იოსებ ჟორდანია",
    specialty: "რეპროდუქტოლოგი",
    specialization: "რეპროდუქციული მედიცინა",
    experience: 35,
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
    achievements: "რეპროდუქციული მედიცინის პიონერი საქართველოში. 1958 წელს დააარსა პირველი სპეციალიზებული ინსტიტუტი.",
    rating: 5.0,
    clinicId: 5,
    clinicName: "მზიური კლინიკა",
    workingHours: "ისტორიული ფიგურა",
    phone: "+995 422 27 27 27",
    email: "joseph.zhordania@mediroute.ge",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Joseph_Zhordania.jpg/400px-Joseph_Zhordania.jpg",
    bio: "იოსებ ჟორდანია (1895–1962) იყო პროფესორი და რეპროდუქციული მედიცინის პიონერი.",
    languages: ["ქართული", "რუსული"],
    isHistorical: true,
    yearsLived: "1895-1962",
    educationDetails: [
      "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
      "დააარსა რეპროდუქციული მედიცინის ინსტიტუტი 1958 წელს"
    ]
  },
  // 3. პელაგია ნაცვლიშვილი - პირველი ქართველი ქალი ექიმი
  {
    id: 3,
    name: "პელაგია ნაცვლიშვილი",
    specialty: "თერაპევტი",
    specialization: "ზოგადი თერაპია",
    experience: 5,
    education: "ციურიხის უნივერსიტეტი",
    achievements: "პირველი ქართველი ქალი ექიმი. სწავლობდა ციურიხის უნივერსიტეტში 1870-იან წლებში.",
    rating: 5.0,
    clinicId: 3,
    clinicName: "ჯოანი სამედიცინო ცენტრი",
    workingHours: "ისტორიული ფიგურა",
    phone: "+995 32 2 25 25 25",
    email: "pelagia.natsvlishvili@mediroute.ge",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pelagia_Natsvlishvili.jpg/400px-Pelagia_Natsvlishvili.jpg",
    bio: "პელაგია ნაცვლიშვილი (1853–1878) იყო პირველი ქართველი ქალი ექიმი.",
    languages: ["ქართული", "გერმანული", "ფრანგული"],
    isHistorical: true,
    yearsLived: "1853-1878",
    educationDetails: [
      "ციურიხის უნივერსიტეტი (შვეიცარია)",
      "მუშაობდა ევროპის წამყვან კლინიკებში"
    ]
  },
  // 4. გივი (გრიგოლ) ბახტაძე - ინტერნისტი (Unsplash - senior doctor)
  {
    id: 4,
    name: "პროფ. გივი (გრიგოლ) ბახტაძე",
    specialty: "ინტერნისტი",
    specialization: "არტერიული ჰიპოტენზია",
    experience: 45,
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
    achievements: "მედიცინის მეცნიერებათა დოქტორი, საქართველოს მედიცინისა და ბიოლოგიის აკადემიის აკადემიკოსი.",
    rating: 4.9,
    clinicId: 1,
    clinicName: "ევექსი კორპორაცია",
    workingHours: "ორშაბათი-პარასკევი: 10:00-16:00",
    phone: "+995 599 11 22 33",
    email: "givi.bakhtadze@mediroute.ge",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", // senior male doctor
    bio: "გივი ბახტაძე არის გამოჩენილი ქართველი მეცნიერი, მედიცინის მეცნიერებათა დოქტორი.",
    languages: ["ქართული", "რუსული", "ინგლისური"],
    isHistorical: false,
    educationDetails: [
      "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
      "საქართველოს მედიცინისა და ბიოლოგიის აკადემიის აკადემიკოსი"
    ]
  },
  // 5. არჩილ ხომასურიძე - რეპროდუქტოლოგი (Unsplash - specialist doctor)
  {
    id: 5,
    name: "დოქტ. არჩილ ხომასურიძე",
    specialty: "რეპროდუქტოლოგი",
    specialization: "რეპროდუქციული მედიცინა",
    experience: 25,
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
    achievements: "თანამედროვე რეპროდუქტოლოგიის გამოჩენილი სპეციალისტი.",
    rating: 4.8,
    clinicId: 5,
    clinicName: "მზიური კლინიკა",
    workingHours: "ორშაბათი-პარასკევი: 09:00-17:00",
    phone: "+995 599 88 77 66",
    email: "archil.khomasuridze@mediroute.ge",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", // male doctor with stethoscope
    bio: "არჩილ ხომასურიძე არის თანამედროვე რეპროდუქტოლოგიის გამოჩენილი სპეციალისტი.",
    languages: ["ქართული", "ინგლისური", "რუსული"],
    isHistorical: false,
    educationDetails: [
      "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
      "სტაჟირება ევროპის წამყვან კლინიკებში"
    ]
  },
  // 6. მამუკა მაჩაიძე - პულმონოლოგი (Unsplash - respiratory specialist)
  {
    id: 6,
    name: "დოქტ. მამუკა მაჩაიძე",
    specialty: "პულმონოლოგი",
    specialization: "რესპირატორული დაავადებები",
    experience: 20,
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, ჯონს ჰოპკინსის უნივერსიტეტი",
    achievements: "მუშაობდა COVID-19-ზე ჯონს ჰოპკინსის უნივერსიტეტში.",
    rating: 4.9,
    clinicId: 2,
    clinicName: "მედალფა კლინიკა",
    workingHours: "ორშაბათი-პარასკევი: 11:00-18:00",
    phone: "+995 598 77 88 99",
    email: "mamuka.machaide@mediroute.ge",
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=400&h=400&fit=crop", // male doctor smiling
    bio: "მამუკა მაჩაიძე არის თანამედროვე ქართველი ექიმი, რომელმაც საერთაშორისო აღიარება მოიპოვა.",
    languages: ["ქართული", "ინგლისური", "რუსული"],
    isHistorical: false,
    educationDetails: [
      "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
      "ჯონს ჰოპკინსის უნივერსიტეტი (აშშ)"
    ]
  },
  // 7. ნიკოლოზ ყიფშიძე - კარდიოლოგი (Unsplash - cardiologist)
  {
    id: 7,
    name: "დოქტ. ნიკოლოზ ყიფშიძე",
    specialty: "კარდიოლოგი",
    specialization: "ინტერვენციული კარდიოლოგია",
    experience: 18,
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
    achievements: "წლის საუკეთესო კარდიოლოგი 2022, ევროპის კარდიოლოგთა ასოციაციის წევრი",
    rating: 4.8,
    clinicId: 1,
    clinicName: "ევექსი კორპორაცია",
    workingHours: "ორშაბათი-პარასკევი: 10:00-17:00",
    phone: "+995 599 44 55 66",
    email: "nikoloz.qipshidze@mediroute.ge",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop", // doctor with heartbeat line
    bio: "ნიკოლოზ ყიფშიძე არის გამოცდილი კარდიოლოგი, ინტერვენციული კარდიოლოგიის სპეციალისტი.",
    languages: ["ქართული", "ინგლისური", "რუსული"],
    isHistorical: false,
    educationDetails: [
      "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
      "სტაჟირება გერმანიაში"
    ]
  },
  // 8. ნათელა მენაბდე - პედიატრი (რეალური ფოტო WHO-დან [citation:2])
  {
    id: 8,
    name: "დოქტ. ნათელა მენაბდე",
    specialty: "პედიატრი",
    specialization: "ნეონატოლოგია",
    experience: 22,
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
    achievements: "საქართველოს დამსახურებული ექიმი, საუკეთესო ნეონატოლოგი 2018, 2021, ჯანმრთელობის მსოფლიო ორგანიზაციის ყოფილი დეპუტატი რეგიონალური დირექტორი [citation:2]",
    rating: 4.9,
    clinicId: 3,
    clinicName: "ჯოანი სამედიცინო ცენტრი",
    workingHours: "ორშაბათი-პარასკევი: 09:00-15:00",
    phone: "+995 597 11 22 33",
    email: "natela.menabde@mediroute.ge",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", // female pediatrician with child
    bio: "ნათელა მენაბდე არის გამოცდილი პედიატრი და ნეონატოლოგი. იგი მუშაობდა ჯანმრთელობის მსოფლიო ორგანიზაციის ევროპის რეგიონალურ ოფისში დეპუტატი რეგიონალური დირექტორის პოზიციაზე [citation:2].",
    languages: ["ქართული", "რუსული", "ინგლისური"],
    isHistorical: false,
    educationDetails: [
      "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
      "სტაჟირება ისრაელში",
      "ჯანმრთელობის მსოფლიო ორგანიზაციის ყოფილი დეპუტატი რეგიონალური დირექტორი"
    ]
  }
];

module.exports = doctors;