import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || user?.name || "");
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
      specialty,
      avatar
    });

    setIsEditing(false);
    setMessage("Profile updated successfully.");
  };

  return (
    <div className="profile-card-modern profile-clean-card">
  <div className="profile-clean-left">
    <div className="profile-avatar-large-wrap clean-avatar">
      <img src={avatarUrl} alt={displayName} className="profile-avatar-large" />
    </div>

    <span className="profile-badge">{t.activeStudent}</span>

    <h2>{displayName}</h2>
    <p className="profile-role-modern">{user?.specialty || t.specialtyNotSet}</p>
    <p className="profile-email-modern">{user?.email}</p>
  </div>

  <div className="profile-clean-right">
    <div className="profile-stats-modern clean-stats">
      <div className="profile-stat-box">
        <span>{t.phoneNumber}</span>
        <strong>{user?.phone || t.notSet}</strong>
      </div>

      <div className="profile-stat-box">
        <span>{t.specialty}</span>
        <strong>{user?.specialty || t.notSet}</strong>
      </div>

      <div className="profile-stat-box">
        <span>{t.status}</span>
        <strong>{t.authorized}</strong>
      </div>
    </div>

    <div className="profile-about-box clean-about">
      <h3>{t.aboutProfile}</h3>
      <p>{t.profileText}</p>
    </div>

    {message && <p className="success-text profile-message">{message}</p>}

    {isEditing ? (
      <form className="profile-edit-form" onSubmit={handleSaveProfile}>
        <label>
          {t.profilePhoto}
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </label>

        <label>
          {t.fullName}
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Example: Zhandos Zhumadildayev"
          />
        </label>

        <label>
          {t.email}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="student@example.com"
          />
        </label>

        <label>
          {t.phoneNumber}
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+7 777 123 45 67"
          />
        </label>

        <label>
          {t.specialty}
          <select
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          >
            <option value="">{t.selectSpecialty}</option>
            <option value="Digital Engineering">Digital Engineering</option>
            <option value="Digital Management and Design">
              Digital Management and Design
            </option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </label>

        <div className="profile-actions-modern clean-actions">
          <button className="primary-action" type="submit">
            {t.saveChanges}
          </button>

          <button
            className="secondary-action"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            {t.cancel}
          </button>
        </div>
      </form>
    ) : (
      <div className="profile-actions-modern clean-actions">
        <button
          className="primary-action"
          type="button"
          onClick={() => setIsEditing(true)}
        >
          {t.editProfile}
        </button>
      </div>
    )}
  </div>
</div>
  );
}

export default ProfilePage;