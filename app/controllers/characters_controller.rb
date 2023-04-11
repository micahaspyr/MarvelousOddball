class CharactersController < ApplicationController
  BASE_URL = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=#{ENV['API_KEY']}&hash=#{ENV['API_HASH']}"
  def index
    response = RestClient.get(BASE_URL, { params: { nameStartsWith: params[:search], limit: params[:limit], offset: params[:offset] } })
    @characters = JSON.parse(response.body)["data"]["results"]
  end
end
