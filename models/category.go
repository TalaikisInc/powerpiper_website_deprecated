package models

import "encoding/json"

type Category struct {
	ID      int32
	Title   string
	Slug    string
	PostCnt int
}

type CategoryJSON struct {
	ID      int32  `json:"id, omitempty"`
	Title   string `json:"title, omitempty"`
	Slug    string `json:"slug, omitempty"`
	PostCnt int    `json:"post_count"`
}

func (c *Category) MarshalJSON() ([]byte, error) {
	return json.Marshal(CategoryJSON{
		c.ID,
		c.Title,
		c.Slug,
		c.PostCnt,
	})
}

func (c *Category) UnmarshalJSON(b []byte) error {
	temp := &CategoryJSON{}

	if err := json.Unmarshal(b, &temp); err != nil {
		return err
	}

	c.ID = temp.ID
	c.Title = temp.Title
	c.Slug = temp.Slug
	c.PostCnt = temp.PostCnt

	return nil
}
