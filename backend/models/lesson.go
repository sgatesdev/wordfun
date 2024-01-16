package models

import (
	"time"
)

// stuff
type Lesson struct {
	ID          string `json:"id" gorm:"primary_key"`
	Title       string `json:"title" gorm:"title"`
	Description string `json:"description" gorm:"description"`
	Words       string `json:"words" gorm:"words"`

	CreatedAt time.Time
	UpdatedAt time.Time
}

type LessonReq struct {
	Words []string `json:"words"`
}

type LetterBanks struct {
	LetterBanks []string `json:"letter_banks"`
}
