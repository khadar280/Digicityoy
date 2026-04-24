<div className="overlay">
  <div className="modal">
    <h2>Home Repair Booking</h2>

    {repair && (
      <p>
        <strong>{repair.name}</strong> — €{repair.price}
      </p>
    )}

    <form onSubmit={handleSubmit} className="form">

      <input
        name="name"
        placeholder="Full Name"
        required
        onChange={handleChange}
      />

      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        required
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email (optional)"
        onChange={handleChange}
      />

      <textarea
        name="issue"
        placeholder="Describe your issue (e.g. screen broken, not charging...)"
        required
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Street Address"
        required
        onChange={handleChange}
      />

      <input
        name="postcode"
        placeholder="Post Code"
        required
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        required
        onChange={handleChange}
      />

      {/* BUTTONS */}
      <div className="button-group">
        <button type="submit" className="submit-btn">
          Submit Request
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>

    </form>
  </div>
</div>