package models

import (
	"encoding/json"
)

type Author struct {
	ID        int32
	FirstName string
	LastName  string
	Username  string
	Avatar    string
	PostCnt   int
}

type AuthorJSON struct {
	ID        int32  `json:"id, omitempty"`
	FirstName string `json:"first_name, omitempty"`
	LastName  string `json:"last_name, omitempty"`
	Username  string `json:"username, omitempty"`
	Avatar    string `json:"avatar"`
	PostCnt   int    `json:"post_count"`
}

func (p *Author) MarshalJSON() ([]byte, error) {
	return json.Marshal(AuthorJSON{
		p.ID,
		p.FirstName,
		p.LastName,
		p.Username,
		p.Avatar,
		p.PostCnt,
	})
}

func (p *Author) UnmarshalJSON(b []byte) error {
	temp := &AuthorJSON{}

	if err := json.Unmarshal(b, &temp); err != nil {
		return err
	}

	p.ID = temp.ID
	p.FirstName = temp.FirstName
	p.LastName = temp.LastName
	p.Username = temp.Username
	p.Avatar = temp.Avatar
	p.PostCnt = temp.PostCnt

	return nil
}
