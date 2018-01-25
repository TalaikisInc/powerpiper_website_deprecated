package models

import (
	"encoding/json"
)

type Post struct {
	ID         int32
	Title      string
	Slug       string
	Content    string
	Date       string
	Image      string
	CategoryID Category
	TotalPosts int
	AuthorID   Author
}

type PostJSON struct {
	ID         int32    `json:"id, omitempty"`
	Title      string   `json:"title, omitempty"`
	Slug       string   `json:"slug, omitempty"`
	Content    string   `json:"content"`
	Date       string   `json:"date, omitempty"`
	Image      string   `json:"image"`
	CategoryID Category `json:"category_id, omitempty"`
	TotalPosts int      `json:"total_posts, omitempty"`
	AuthorID   Author   `json:"author_id, omitempty"`
}

func (p *Post) MarshalJSON() ([]byte, error) {
	return json.Marshal(PostJSON{
		p.ID,
		p.Title,
		p.Slug,
		p.Content,
		p.Date,
		p.Image,
		p.CategoryID,
		p.TotalPosts,
		p.AuthorID,
	})
}

func (p *Post) UnmarshalJSON(b []byte) error {
	temp := &PostJSON{}

	if err := json.Unmarshal(b, &temp); err != nil {
		return err
	}

	p.ID = temp.ID
	p.Title = temp.Title
	p.Slug = temp.Slug
	p.Content = temp.Content
	p.Date = temp.Date
	p.Image = temp.Image
	p.CategoryID = temp.CategoryID
	p.TotalPosts = temp.TotalPosts
	p.AuthorID = temp.AuthorID

	return nil
}
