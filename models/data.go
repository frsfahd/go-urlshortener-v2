package models

type Link struct {
	Long_URL  string `bson:"long_url" json:"long_url"`
	Short_URL string `bson:"short_url" json:"short_url"`
	Keyword   string `bson:"keyword" json:"keyword"`
}

type Validation struct {
	Status     string
	KeywordErr string
}
