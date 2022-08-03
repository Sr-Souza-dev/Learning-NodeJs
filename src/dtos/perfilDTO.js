module.exports = class PerfilDTO{
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.description = obj.description;
        this.createdAt = obj.createdAt;
        this.updatedAt = obj.updatedAt;
    }
}