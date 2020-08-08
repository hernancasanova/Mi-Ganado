const ADD = '/agregar';
const EDIT = '/editar';
const CREATE = '/create';
const DELETE = '/eliminar';
const PRE_SINGLE = '/';
const GROUPS = '/grupos';
const ATTENDEES = '/asistentes';
const TOPICS = '/temas';
const EVALUATIONS = '/evaluaciones';
const REPOSITORIES = '/repositorios';
const FILES = '/files';
const INSTITUTIONS = '/instituciones';
const QUESTIONS = '/preguntas';
const OBJECTIVES = '/objetivos';
const PATHS = {
  // #region Groups
  GROUPS,
  GROUPS_EDIT: GROUPS + EDIT + PRE_SINGLE,
  GROUPS_ADD: GROUPS + ADD,
  GROUPS_DELETE: GROUPS + DELETE,
  GROUPS_PRE_SINGLE: GROUPS + PRE_SINGLE,
  // #endregion
  // #region Attendees
  ATTENDEES,
  ATTENDEES_ADD: ATTENDEES + ADD,
  ATTENDEES_DELETE: ATTENDEES + DELETE,
  ATTENDEES_PRE_SINGLE: ATTENDEES + PRE_SINGLE,
  ATTENDEES_LOAD: `${ATTENDEES}/cargar`,
  // #endregion
  // #region Topics
  TOPICS,
  TOPICS_ADD: TOPICS + ADD,
  TOPICS_DELETE: TOPICS + DELETE,
  TOPICS_PRE_SINGLE: TOPICS + PRE_SINGLE,
  // #endregion
  // #region
  EVALUATIONS,
  EVALUATIONS_ADD: EVALUATIONS + ADD,
  EVALUATIONS_DELETE: EVALUATIONS + DELETE,
  EVALUATIONS_PRE_SINGLE: EVALUATIONS + PRE_SINGLE,
  EVALUATIONS_ASIGNATIONS: `${EVALUATIONS}/asignacion`,
  // #endregion
  // #region Questions
  QUESTIONS,
  QUESTIONS_ADD: QUESTIONS + ADD,
  QUESTIONS_DELETE: QUESTIONS + DELETE,
  QUESTIONS_PRE_SINGLE: QUESTIONS + PRE_SINGLE,
  // #endregion
  // #region Objectives
  OBJECTIVES,
  OBJECTIVES_ADD: OBJECTIVES + ADD,
  OBJECTIVES_DELETE: OBJECTIVES + DELETE,
  OBJECTIVES_PRE_SINGLE: OBJECTIVES + PRE_SINGLE,
  // #endregion
  // #region Repositories
  REPOSITORIES,
  REPOSITORIES_ADD: REPOSITORIES + ADD,
  REPOSITORIES_DELETE: REPOSITORIES + DELETE,
  REPOSITORIES_PRE_SINGLE: REPOSITORIES + PRE_SINGLE,
  REPOSITORIES_CREATE: REPOSITORIES + CREATE,
  REPOSITORIES_FORMULA: `${REPOSITORIES}/formula`,
  // #endregion
  // #region Files
  FILES,
  // #endregion
  // #region Institutions
  INSTITUTIONS,
  INSTITUTIONS_ADD: INSTITUTIONS + ADD,
  INSTITUTIONS_DELETE: INSTITUTIONS + DELETE,
  INSTITUTIONS_PRE_SINGLE: INSTITUTIONS + PRE_SINGLE,
  // #endregion
  // #region Login
  LOGIN: '/login',
  // #endregion
  // #region Home
  HOME: '/',
  // #endregion
  // #region Profile
  PROFILE: '/perfil',
  // #endregion
  // #region Logout
  LOGOUT: '/logout'
  // #endregion
};
export default PATHS;
