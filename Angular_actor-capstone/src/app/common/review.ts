export class Review {
    constructor(
        public reviewId: number,
        public datePosted: String,
        public description: String, 
        public rating: number,
        public movieId: number
    ){}
}
