import { Component, OnInit } from '@angular/core';
import datajson from '../../assets/resources/data';
import { blog } from '../models/blog';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  isLongEnabled = true;
  isShortEnabled = true;
  blogs: blog[] = [];
  long_blogs: blog[] = [];
  short_blogs: blog[] = [];
  recent_blogs: blog[] = [];
  old_blogs: blog[] = [];
  private dataJson: any = datajson;

  constructor(public dialog: MatDialog, private hc: HttpClient) { }

  ngOnInit(): void {
    //this.blogs = this.dataJson as blog[];
    this.getBlogs();
  }

  private getBlogs() {
    const url = "http://localhost:3900/api/blogs";
    this.hc.get(url).subscribe(data => {
      this.blogs = data as blog[];
      this.populateRecentOld();
      this.calculateShortLong();
    });
  }

  public populateRecentOld() {
    this.recent_blogs = [];
    this.old_blogs = [];
    this.blogs.forEach((blog) => {
      if (blog.getIsRecent()) {
        if (this.isLongEnabled && this.isShortEnabled) {
          this.recent_blogs.push(blog);
        }
        else if (this.isLongEnabled && !this.isShortEnabled) {
          if (blog.type === "long") {
            this.recent_blogs.push(blog);
          }
        }
        else if (!this.isLongEnabled && this.isShortEnabled) {
          if (blog.type === "short") {
            this.recent_blogs.push(blog);
          }
        }
      }
      else {
        if (this.isLongEnabled && this.isShortEnabled) {
          this.old_blogs.push(blog);
        }
        else if (this.isLongEnabled && !this.isShortEnabled) {
          if (blog.type === "long") {
            this.old_blogs.push(blog);
          }
        }
        else if (!this.isLongEnabled && this.isShortEnabled) {
          if (blog.type === "short") {
            this.old_blogs.push(blog);
          }
        }
      }
    });

  }

  calculateShortLong() {
    this.short_blogs = this.blogs.filter(blog => blog.type === "short");
    this.long_blogs = this.blogs.filter(blog => blog.type === "long");
  }

  public deleteAll() {
    if (!confirm("Are you sure to delete all blogs ?")) {
      return;
    }

    const url = "http://localhost:3900/api/blogs/deleteall";
    this.hc.get(url).subscribe(data => {

    });
  }

  toggleChange(param: any) {
    this.populateRecentOld();
  }

}
