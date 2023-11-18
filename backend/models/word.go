package models

type Word struct {
	ID          uint   `json:"id,omitempty" gorm:"primary_key"`
	Word        string `json:"word"`
	AudioFile   string `json:"audio_file"`
	PictureFile string `json:"picture_file"`
	Definition  string `json:"definition"`
	Hint        string `json:"hint"`
}
