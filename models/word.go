package models

type Word struct {
	ID   uint   `json:"id,omitempty" gorm:"primary_key"`
	Word string `json:"word"`
	File string `json:"file"`
}
