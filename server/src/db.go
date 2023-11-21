package db

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

var DB *sqlx.DB

var schema = `
CREATE TABLE IF NOT EXISTS user (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT NOT NULL,
		password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS answer (
    id UUID PRIMARY KEY,
		assignment_id UUID NOT NULL,
    owner_id UUID NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES user(id),
    FOREIGN KEY (assignment_id) REFERENCES assignment(id)
);

CREATE TABLE IF NOT EXISTS file (
	id UUID PRIMARY KEY,
	name TEXT NOT NULL,
	answer_id UUID NOT NULL,
	FOREIGN KEY (answer_id) REFERENCES answer(id)
);

CREATE TABLE IF NOT EXISTS assignment (
    id UUID PRIMARY KEY,
		title TEXT NOT NULL,
		completed INTEGER,
		description TEXT,
		due TEXT,
    owner_id UUID NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES user(id)
);
`

type User struct {
	Id       string `db:"id"`
	Email    string `db:"email"`
	Name     string `db:"name"`
	Password string `db:"password"`
}

type File struct {
	Id       string `db:"id"`
	Name     string `db:"name"`
	AnswerId string `db:"answer_id"`
}

type Answer struct {
	Id           string `db:"id"`
	AssignmentId string `db:"assignment_id"`
	OwnerId      string `db:"owner_id"`
}

type Assignment struct {
	Id          string `db:"id"`
	Title       string `db:"title"`
	Due         string `db:"due"`
	Completed   int    `db:"completed"`
	Description string `db:"description"`
	OwnerId     string `db:"owner_id"`
}

func ConnecToDB() {
	db, err := sqlx.Connect("sqlite3", "database.sqlite3")
	if err != nil {
		panic("Failed to establish database connection: " + err.Error())
	}

	_, err = db.Exec(schema)
	if err != nil {
		panic("Failed to migrate db: " + err.Error())
	}

	DB = db
}
