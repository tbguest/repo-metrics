// update preferences
handler.patch(async (req, res) => {
  if (!req.user) {
    res.status(401).end();
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { preferences } = JSON.parse(req.body);

  const _id = new ObjectId(req.user._id);

  const updates = {
    ...(preferences && {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      preferences: {
        ...req.user.preferences,
        ...preferences,
      },
    }),
  };

  const user = await updateUserById(req.db, _id, updates);

  res.json({ user: extractUser(user) });
});

export async function updateUserById(
  db: Db,
  id: ObjectId,
  update: Partial<MongoUser>
): Promise<MongoUser | null> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    db
      .collection("users")
      .findOneAndUpdate(
        { _id: id },
        { $set: update },
        { returnOriginal: false }
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then(({ value }) => value || null)
  );
}
