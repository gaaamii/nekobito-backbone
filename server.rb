require 'sinatra'
require 'rack/ssl'

configure do
  use Rack::SSL if production?
end

get '/' do
  File.read(File.join('public', 'index.html'))
end
