require 'sinatra'

get '/' do
  File.read(File.join('dist', 'index.html'))
end
