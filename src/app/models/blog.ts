
export class blog {
    public id: number;
    public type: String;
    public body: String;
    public datetime: String;
    public title: String;
    public image: String;
    public isRecent: boolean;
    public blog() {
        this.id = 0;
        this.type = "";
        this.body = "";
        this.datetime = "";
        this.title = "";
        this.image = "";
        this.isRecent = false;
    }

    public addData=(data:any)=>{
        this.id=data.id;
        this.type=data.type;
        this.body = data.body;
        this.datetime = data.datetime;
        this.title = data.title;
        this.image = data.image;
        this.isRecent = data.isRecent;
        return this;
    }

    public getIsRecent(): boolean {
        let year = new Date(this.datetime.toString()).getFullYear();
        if (year > 2021) {
            return true;
        }
        return false;
    }

}