class Student {
    constructor(FirstName, LastName, FacultyNumber, Grade) {
        this.FirstName = FirstName,
        this.LastName = LastName,
        this.FacultyNumber = FacultyNumber,
        this.Grade = Grade,
        this.ID = Student.incrementId()
    }

    static incrementId() {
        if(!this.latestId) this.latestId = 1;
        else this.latestId ++;
        return this.latestId
    }
}