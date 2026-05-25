import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [specialty, setSpecialty] = useState(user?.specialty || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [message, setMessage] = useState("");

  const displayName = user?.fullName || user?.name || "Student";

  const avatarUrl =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=1e293b&color=fff&bold=true&size=200`;

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !specialty.trim()) {
      setMessage("Please fill in all profile fields.");
      return;
    }

    updateProfile({
      fullName: fullName.trim(),
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      specialty: specialty.trim(),
      avatar
    });

    setIsEditing(false);
    setMessage("Profile updated successfully.");
  };

  return (
    <section className="profile-page-modern">
      <div className="profile-card-modern">
        <div className="profile-cover" />

        <div className="profile-body">
          <div className="profile-avatar-large-wrap">
            <img src={avatarUrl} alt={displayName} className="profile-avatar-large" />
          </div>

          <div className="profile-main-info">
            <span className="profile-badge">Active student</span>
            <h2>{displayName}</h2>
            <p className="profile-role-modern">{user?.specialty || "Specialty not set"}</p>
            <p className="profile-email-modern">{user?.email}</p>
          </div>
        </div>

        <div className="profile-stats-modern">
          <div className="profile-stat-box">
            <span>Phone</span>
            <strong>{user?.phone || "Not set"}</strong>
          </div>

          <div className="profile-stat-box">
            <span>Specialty</span>
            <strong>{user?.specialty || "Not set"}</strong>
          </div>

          <div className="profile-stat-box">
            <span>Status</span>
            <strong>Authorized</strong>
          </div>
        </div>

        <div className="profile-about-box">
          <h3>About profile</h3>
          <p>
            This page shows and updates student information: photo, full name,
            phone number, email, and specialty.
          </p>
        </div>

        {message && <p className="success-text profile-message">{message}</p>}

        {isEditing && (
          <form className="profile-edit-form" onSubmit={handleSaveProfile}>
            <label>
              Profile photo
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </label>

            <label>
              Full name
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Example: Zhandos Zhumadildayev"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@example.com"
              />
            </label>

            <label>
              Phone number
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+7 777 123 45 67"
              />
            </label>

            <label>
  Specialty
  <select
    value={specialty}
    onChange={(event) => setSpecialty(event.target.value)}
  >
    <option value="">Select specialty</option>
    <option value="Digital Engineering">Digital Engineering</option>
    <option value="Digital Management and Design">
      Digital Management and Design
    </option>
    <option value="Cybersecurity">Cybersecurity</option>
  </select>
</label>

            <div className="profile-actions-modern">
              <button className="primary-action" type="submit">
                Save changes
              </button>

              <button
                className="secondary-action"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!isEditing && (
          <div className="profile-actions-modern">
            <button
              className="primary-action"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit profile
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfilePage;