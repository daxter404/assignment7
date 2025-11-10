// manage the transcript database
export type StudentID = number;
export type Student = { studentID: number; studentName: string };
export type Course = string;
export type CourseGrade = { course: Course; grade: number };
export type Transcript = { student: Student; grades: CourseGrade[] };

// the database of transcript
let allTranscripts: Transcript[] = [];

export function initialize(): void {
  allTranscripts = [];
  addStudent('Sardor', [
    { course: 'CS360', grade: 100 },
    { course: 'CS411', grade: 100 },
  ]);
...
  return { student: theTranscript.student, grades: grades.concat({ course, grade }) };
}

// returns the grade for the given student in the given course.
// throws an error if no such student or no such course for that student
export function getGrade(studentID: StudentID, course: Course): number {
  const theTranscript = allTranscripts.find(t => t.student.studentID == studentID);
  const theGrade = theTranscript.grades.find(g => g.course == course);
  if (theGrade === undefined) {
    throw new Error(`no grade for student ${studentID} in course ${course}`);
  }

  return theGrade.grade;
}
