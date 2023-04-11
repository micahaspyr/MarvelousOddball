json.array! @characters do |character|
    json.id character["id"]
    json.name character["name"]
end