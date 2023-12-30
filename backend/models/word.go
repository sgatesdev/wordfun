package models

import "time"

type Word struct {
	ID          string `json:"id,omitempty" gorm:"primary_key" gorm:"column:id"`
	Word        string `json:"word" gorm:"word"`
	AudioFile   string `json:"audio_file" gorm:"audio_file"`
	PictureFile string `json:"picture_file" gorm:"picture_file"`
	Definition  string `json:"definition" gorm:"definition"`
	Hint        string `json:"hint" gorm:"hint"`

	CreatedAt time.Time
	UpdatedAt time.Time
}

type WordResult struct {
	ID   string `json:"id,omitempty" gorm:"primary_key" gorm:"column:id"`
	Word string `json:"word" gorm:"word"`

	CreatedAt time.Time
	UpdatedAt time.Time
}
