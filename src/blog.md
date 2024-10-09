---
layout: default.njk
permalink: /blog/index.html
templateEngineOverride: njk,md

title: Blog
---
<div class="blog-container">
  <h1>Blog Posts</h1>
  <ul class="post-list">
  {%- for post in collections.post -%}
    <li>
      <h2><a href="{{ post.url | url }}">{{ post.data.title }}</a></h2>
      <p class="post-meta">{{ post.date | dateFilter }}</p>
      {% if post.data.excerpt %}
        <p>{{ post.data.excerpt }}</p>
      {% endif %}
      <a href="{{ post.url | url }}" class="read-more">Read more</a>
    </li>
  {%- endfor -%}
  </ul>
</div>
