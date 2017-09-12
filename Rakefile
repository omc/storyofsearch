
task :build do
  system "npm run build"
end

task :shrink_images do

  opts = [
    "-filter Triangle",
    "-resize '900x100000>'",
    "-quality 85",
    "-define png:compression-filter=5",
    "-define png:compression-strategy=1",
    "-define png:compression-level=9",
    "-define png:exclude-chunk=all",
    "-interlace none",
    "-colorspace sRGB",
    "-strip",
    "-background '#fbfdff' -flatten"
  ].join(" ")
  

  Dir["app/assets/art_large/*.png"].each { |file|
    target = "app/assets/art/#{file.split("/").last}".sub("png", "jpg")
    system "convert #{file} #{opts} #{target}"
  }
end

task :publish => :build do
  puts "Uploading to S3 (Requires a valid session with bonsai account)"
  system "cd dist && aws s3 sync . s3://storyofsearch"
  puts "Invalidating Cloudfront Caches"
  system "aws cloudfront create-invalidation --distribution-id E98BQDRSSTCXI --paths /index.html"
end