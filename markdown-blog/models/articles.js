const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitedHtml: {
      type: String,
      required: true,
  }
});
articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lowercase: true, strict: true });
  }
  if (this.markdown) {
     this.sanitedHtml = dompurify.sanitize(marked(this.markdown));
  }
  next();
});
module.exports = mongoose.model("Article", articleSchema);
