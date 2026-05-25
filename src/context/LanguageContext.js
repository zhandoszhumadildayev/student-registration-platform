import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const LanguageContext = createContext(null);

const translations = {
  en: {
    dashboard: "Dashboard",
    courses: "Courses",
    schedule: "Schedule",
    profile: "Profile",
    studentPortal: "Student portal",
    subtitle:
      "A simple platform for creating a student profile, managing courses, schedule and notifications.",
    logout: "Logout",

    notifications: "Notifications",
    markRead: "Mark read",
    noNotifications: "No notifications yet",

    welcomeBack: "Welcome back",
    hello: "Hello",
    goToCourses: "Go to courses",
    openProfile: "Open profile",

    courseManagement: "Course management",
    courseTitle: "Explore and manage courses",
    courseText:
      "Browse course data, search by title, filter by category, add custom courses and open detail pages.",
    totalCourses: "Total courses",
    visibleCourses: "Visible courses",
    selectedCourse: "Selected course",
    none: "None",
    searchCourse: "Search course...",
    allCategories: "All categories",
    addNewCourse: "Add new course",
    title: "Title",
    category: "Category",
    description: "Description",
    addCourse: "Add course",
    loadingCourses: "Loading courses...",
    noCoursesFound: "No courses found.",
    courseAdded: "Course added successfully.",
    courseDeleted: "Course deleted successfully.",
    select: "Select",
    chosen: "Chosen",
    details: "Details",
    delete: "Delete",

    profilePhoto: "Profile photo",
    fullName: "Full name",
    phoneNumber: "Phone number",
    specialty: "Specialty",
    email: "Email",
    status: "Status",
    authorized: "Authorized",
    aboutProfile: "About profile",
    profileText:
      "This page shows and updates student information: photo, full name, phone number, email, and specialty.",
    saveChanges: "Save changes",
    cancel: "Cancel",
    selectSpecialty: "Select specialty",
    activeStudent: "Active student",
    specialtyNotSet: "Specialty not set",
    notSet: "Not set",
    editProfile: "Edit profile",

    schedulePage: "Schedule",
    scheduleTitle: "Student schedule",
    scheduleText: "Create and manage your weekly class schedule.",
    addScheduleItem: "Add schedule item",
    subject: "Subject",
    day: "Day",
    time: "Time",
    addToSchedule: "Add to schedule",
    mySchedule: "My schedule",
    noSchedule: "No schedule items yet.",
    action: "Action"
  },

  ru: {
    dashboard: "Панель управления",
    courses: "Курсы",
    schedule: "Расписание",
    profile: "Профиль",
    studentPortal: "Студенческий портал",
    subtitle:
      "Простая платформа для создания профиля студента, управления курсами, расписанием и уведомлениями.",
    logout: "Выйти",

    notifications: "Уведомления",
    markRead: "Прочитано",
    noNotifications: "Пока нет уведомлений",

    welcomeBack: "Добро пожаловать",
    hello: "Здравствуйте",
    goToCourses: "Перейти к курсам",
    openProfile: "Открыть профиль",

    courseManagement: "Управление курсами",
    courseTitle: "Просмотр и управление курсами",
    courseText:
      "Просматривайте курсы, ищите по названию, фильтруйте по категории, добавляйте свои курсы и открывайте детали.",
    totalCourses: "Всего курсов",
    visibleCourses: "Показано курсов",
    selectedCourse: "Выбранный курс",
    none: "Нет",
    searchCourse: "Поиск курса...",
    allCategories: "Все категории",
    addNewCourse: "Добавить новый курс",
    title: "Название",
    category: "Категория",
    description: "Описание",
    addCourse: "Добавить курс",
    loadingCourses: "Загрузка курсов...",
    noCoursesFound: "Курсы не найдены.",
    courseAdded: "Курс успешно добавлен.",
    courseDeleted: "Курс успешно удалён.",
    select: "Выбрать",
    chosen: "Выбран",
    details: "Подробнее",
    delete: "Удалить",

    profilePhoto: "Фото профиля",
    fullName: "ФИО",
    phoneNumber: "Номер телефона",
    specialty: "Специальность",
    email: "Email",
    status: "Статус",
    authorized: "Авторизован",
    aboutProfile: "О профиле",
    profileText:
      "На этой странице можно посмотреть и изменить данные студента: фото, ФИО, номер телефона, email и специальность.",
    saveChanges: "Сохранить",
    cancel: "Отмена",
    selectSpecialty: "Выберите специальность",
    activeStudent: "Активный студент",
    specialtyNotSet: "Специальность не выбрана",
    notSet: "Не указано",
    editProfile: "Редактировать профиль",

    schedulePage: "Расписание",
    scheduleTitle: "Расписание студента",
    scheduleText: "Создавайте и управляйте своим недельным расписанием.",
    addScheduleItem: "Добавить занятие",
    subject: "Предмет",
    day: "День",
    time: "Время",
    addToSchedule: "Добавить в расписание",
    mySchedule: "Моё расписание",
    noSchedule: "Пока нет записей в расписании.",
    action: "Действие"
  },

  kk: {
    dashboard: "Басқару панелі",
    courses: "Курстар",
    schedule: "Сабақ кестесі",
    profile: "Профиль",
    studentPortal: "Студент порталы",
    subtitle:
      "Студент профилін жасауға, курстарды, сабақ кестесін және хабарламаларды басқаруға арналған қарапайым платформа.",
    logout: "Шығу",

    notifications: "Хабарламалар",
    markRead: "Оқылды",
    noNotifications: "Әзірге хабарлама жоқ",

    welcomeBack: "Қайта келдіңіз",
    hello: "Сәлем",
    goToCourses: "Курстарға өту",
    openProfile: "Профильді ашу",

    courseManagement: "Курстарды басқару",
    courseTitle: "Курстарды көру және басқару",
    courseText:
      "Курстарды қараңыз, атауы бойынша іздеңіз, категория бойынша сүзгілеңіз, өз курсыңызды қосыңыз және толық ақпарат бетін ашыңыз.",
    totalCourses: "Барлық курс",
    visibleCourses: "Көрсетілген курс",
    selectedCourse: "Таңдалған курс",
    none: "Жоқ",
    searchCourse: "Курс іздеу...",
    allCategories: "Барлық категориялар",
    addNewCourse: "Жаңа курс қосу",
    title: "Атауы",
    category: "Категория",
    description: "Сипаттама",
    addCourse: "Курс қосу",
    loadingCourses: "Курстар жүктелуде...",
    noCoursesFound: "Курс табылмады.",
    courseAdded: "Курс сәтті қосылды.",
    courseDeleted: "Курс сәтті өшірілді.",
    select: "Таңдау",
    chosen: "Таңдалды",
    details: "Толығырақ",
    delete: "Өшіру",

    profilePhoto: "Профиль фотосы",
    fullName: "Аты-жөні",
    phoneNumber: "Телефон нөмірі",
    specialty: "Мамандық",
    email: "Email",
    status: "Статус",
    authorized: "Авторизация жасалған",
    aboutProfile: "Профиль туралы",
    profileText:
      "Бұл бетте студент мәліметтерін көруге және өзгертуге болады: фото, аты-жөні, телефон нөмірі, email және мамандық.",
    saveChanges: "Сақтау",
    cancel: "Болдырмау",
    selectSpecialty: "Мамандықты таңдаңыз",
    activeStudent: "Белсенді студент",
    specialtyNotSet: "Мамандық таңдалмаған",
    notSet: "Көрсетілмеген",
    editProfile: "Профильді өзгерту",

    schedulePage: "Сабақ кестесі",
    scheduleTitle: "Студенттің сабақ кестесі",
    scheduleText: "Апталық сабақ кестесін жасаңыз және басқарыңыз.",
    addScheduleItem: "Сабақ қосу",
    subject: "Пән",
    day: "Күн",
    time: "Уақыт",
    addToSchedule: "Кестеге қосу",
    mySchedule: "Менің сабақ кестем",
    noSchedule: "Әзірге сабақ кестесі жоқ.",
    action: "Әрекет"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage("app_language", "en");

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}