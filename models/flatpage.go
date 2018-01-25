package models

import "encoding/json"

type FlatPage struct {
	ID      int8
	URL     string
	Title   string
	Content string
}

type FlatPageJSON struct {
	ID      int8   `json:"id, omitempty"`
	URL     string `json:"url, omitempty"`
	Title   string `json:"title, omitempty"`
	Content string `json:"content"`
}

func (p *FlatPage) MarshalJSON() ([]byte, error) {
	return json.Marshal(FlatPageJSON{
		p.ID,
		p.URL,
		p.Title,
		p.Content,
	})
}

func (p *FlatPage) UnmarshalJSON(b []byte) error {
	temp := &FlatPageJSON{}

	if err := json.Unmarshal(b, &temp); err != nil {
		return err
	}

	p.ID = temp.ID
	p.URL = temp.URL
	p.Title = temp.Title
	p.Content = temp.Content

	return nil
}
