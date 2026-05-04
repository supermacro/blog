#!/usr/bin/env bash
set -Eeuo pipefail

IFS=$'\n\t'

content_dir="src/content/blog"
today="$(date '+%Y-%m-%d')"

read -r -p "Post title: " title
if [[ -z "${title}" ]]; then
	echo "Error: post title is required." >&2
	exit 1
fi

read -r -p "Publish date [${today}]: " pub_date
pub_date="${pub_date:-$today}"

if [[ ! "${pub_date}" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
	echo "Error: publish date must use YYYY-MM-DD format." >&2
	exit 1
fi

if date -j -f "%Y-%m-%d" "${pub_date}" "+%Y-%m-%d" >/dev/null 2>&1; then
	:
elif date -d "${pub_date}" "+%Y-%m-%d" >/dev/null 2>&1; then
	:
else
	echo "Error: publish date is not a valid date." >&2
	exit 1
fi

slug="$(
	printf '%s' "${title}" |
		tr '[:upper:]' '[:lower:]' |
		sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//'
)"

if [[ -z "${slug}" ]]; then
	echo "Error: post title must contain at least one letter or number." >&2
	exit 1
fi

post_path="${content_dir}/${pub_date}-${slug}.md"

if [[ -e "${post_path}" ]]; then
	echo "Error: ${post_path} already exists." >&2
	exit 1
fi

escaped_title="${title//\\/\\\\}"
escaped_title="${escaped_title//\"/\\\"}"

mkdir -p "${content_dir}"

cat >"${post_path}" <<EOF
---
title: "${escaped_title}"
description: ""
pubDate: "${pub_date}"
tags: []
---

EOF

echo "Created ${post_path}"
vim "${post_path}"
