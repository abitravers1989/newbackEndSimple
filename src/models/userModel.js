module.exports = ({ mongoose }) => ({
  createUserSchema: () => {
    const userSchema = new mongoose.Schema(
      {
        userName: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
      },
      { timestamps: true }
    )
    userSchema.set('toJSON', { virtuals: true })
    const User = mongoose.model('User', userSchema)
    return User
  }
})
