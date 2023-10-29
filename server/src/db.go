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
    name TEXT,
		password TEXT
);

CREATE TABLE IF NOT EXISTS file (
    id UUID PRIMARY KEY,
		description TEXT,
    owner_id UUID,
    FOREIGN KEY (owner_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS assignment (
    id UUID PRIMARY KEY,
		title TEXT,
		description TEXT,
    owner_id UUID,
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
	Id          string `db:"id"`
	Description string `db:"description"`
	OwnerId     string `db:"owner_id"`
}

type Assignment struct {
	Id          string `db:"id"`
	Title       string `db:"title"`
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
