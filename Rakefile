
task :build do
  system "npm run build"
end

task :publish => :build do
  system "cd dist && aws s3 sync . s3://storyofsearch"
end