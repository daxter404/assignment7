// manage the transcript database
export type StudentID = number;
export type Student = { studentID: StudentID; studentName: string };
export type Course = string;
export type CourseGrade = { course: Course; grade: number };
export type Transcript = { student: Student; grades: CourseGrade[] };

// the database of transcripts
let allTranscripts: Transcript[] = [];
let nextStudentID: StudentID = 0;

export function initialize(): void {
  allTranscripts = [];
  nextStudentID = 0;

  addStudent('Sardor', [
    { course: 'CS360', grade: 100 },
    { course: 'CS411', grade: 100 },
  ]);

  addStudent('Ali', [{ course: 'CS101', grade: 90 }]);
  addStudent('Vali', []);
  addStudent('Madina', [{ course: 'CS360', grade: 80 }]);
}

export function getAll(): Transcript[] {
  return allTranscripts;
}

export function addStudent(
  name: string,
  grades: CourseGrade[] = [],
): StudentID {
  if (name == null || name.trim() === '') {
    throw new Error('student name must be a non-empty string');
  }

  const student: Student = {
    studentID: nextStudentID,
    studentName: name.trim(),
  };

  const transcript: Transcript = {
    student,
    grades: [...grades],
  };

  allTranscripts.push(transcript);

  const assignedId = nextStudentID;
  nextStudentID += 1;

  return assignedId;
}

export function addGrade(
  studentID: StudentID,
  course: Course,
  grade: number,
): void {
  const transcript = allTranscripts.find(
    t => t.student.studentID === studentID,
  );
  if (!transcript) {
    throw new Error(`no such student ${studentID}`);
  }

  transcript.grades.push({ course, grade });
}

export function getGrades(studentID: StudentID): CourseGrade[] {
  const transcript = allTranscripts.find(
    t => t.student.studentID === studentID,
  );
  if (!transcript) {
    throw new Error(`no such student ${studentID}`);
  }

  return transcript.grades;
}

export function getGrade(studentID: StudentID, course: Course): number {
  const transcript = allTranscripts.find(
    t => t.student.studentID === studentID,
  );
  if (!transcript) {
    throw new Error(`no such student ${studentID}`);
  }

  const grade = transcript.grades.find(g => g.course === course);
  if (!grade) {
    throw new Error(`no grade for student ${studentID} in course ${course}`);
  }

  return grade.grade;
}
