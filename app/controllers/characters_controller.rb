class CharactersController < ApplicationController
  BASE_URL = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=#{ENV['API_KEY']}&hash=#{ENV['API_HASH']}"
  def index
    url = BASE_URL
    url += "&nameStartsWith=#{params[:search]}" if params[:search].present?
    url += "&limit=#{params[:limit]}" if params[:limit].present?
    url += "&offset=#{params[:offset]}" if params[:offset].present?

    response = RestClient.get(url)
    @characters = JSON.parse(response.body)["data"]["results"]
    logger.info(@characters)
    @characters
  end
end
