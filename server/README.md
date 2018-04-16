# WOS Server
- Ruby (version: 2.4.1)
- Ruby On Rails (version: 5.1.4)

# Project Setup
- Install environment for Ruby On Rails
- Clone project source, go to root server path
- Config database: Create `config/database.yml` (base on `config/database.example.yml`)
- Config application: Create `.env` (base on `.env.example`)
- Install gem:
  ```
  gem install bundler
  bundle install
  ```
- Init database:
  ```
  rake db:create
  rake db:migrate
  rake db:seed
  ```
- Start server on port 8000: `rails s -p 8000`

# Deploy to heroku:
- Please check these guides:
  * [https://devcenter.heroku.com/articles/getting-started-with-rails5](https://devcenter.heroku.com/articles/getting-started-with-rails5)

# Seed data update
- If you wanna update data. Please read `db/seeds.rb` code.
