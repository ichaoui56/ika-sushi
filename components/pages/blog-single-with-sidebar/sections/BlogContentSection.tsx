import BlogArticleSection from "./BlogArticleSection";
import AuthorBioSection from "./AuthorBioSection";
import PostTagsSection from "./PostTagsSection";
import PostNavigationSection from "./PostNavigationSection";
import CommentsSection from "./CommentsSection";
import BlogSidebarSection from "./BlogSidebarSection";

export default function BlogContentSection() {
  return (
    <div className="blog-area single full-blog right-sidebar full-blog default-padding">
      <div className="container">
        <div className="blog-items">
          <div className="row">
            <div className="blog-content col-xl-8 col-lg-7 col-md-12 pr-35 pr-md-15 pl-md-15 pr-xs-15 pl-xs-15">
              <BlogArticleSection />

              <AuthorBioSection />

              <PostTagsSection />

              <PostNavigationSection />

              <CommentsSection />
            </div>

            <BlogSidebarSection />
          </div>
        </div>
      </div>
    </div>
  );
}
