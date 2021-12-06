const reviewService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExist(req, res, next) {
  const review = await reviewService.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found.",
  });
}

function destroyReview(req, res, next) {
  reviewService
    .delete(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

function read(req, res, next) {
  const { review: data } = res.locals;

  res.json({ data });
}

async function update(req, res, next) {
  const updateReview = {
    ...req.body.data,
    review_id: req.params.reviewId,
  };


  // utr
  await reviewService.update(updateReview);
  // join table w/ critics and return the data
  res.json({ data: await reviewService.updateJoinTable(req.params.reviewId) });
}

module.exports = {
  read: [asyncErrorBoundary(reviewExist), read],
  delete: [asyncErrorBoundary(reviewExist), asyncErrorBoundary(destroyReview)],
  update: [asyncErrorBoundary(reviewExist), asyncErrorBoundary(update)],
  // list: [asyncErrorBoundary(reviewExist), asyncErrorBoundary(list)],
};