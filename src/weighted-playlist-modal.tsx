import "./weighted-playlist-modal.css";

const React = Spicetify.React;

interface WeightedPlaylistModalProps {
    onClickCancel: () => void;
    onClickCreate: (trackCount: number) => void;
}

export function Button({ name, className, onButtonClick }) {
    return (
        <button className={className} onClick={onButtonClick}>
            {name}
        </button>
    );
}

function NumberInput({ value, onChange, min = 1, max = 100 }) {
    return (
        <div className="weighted-playlist-input-container">
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="weighted-playlist-input"
            />
            <div className="weighted-playlist-input-controls">
                <button 
                    type="button" 
                    className="weighted-playlist-input-btn"
                    onClick={() => onChange(Math.min(max, value + 1))}
                >
                    +
                </button>
                <button 
                    type="button" 
                    className="weighted-playlist-input-btn"
                    onClick={() => onChange(Math.max(min, value - 1))}
                >
                    −
                </button>
            </div>
        </div>
    );
}

export function WeightedPlaylistModal({ onClickCancel, onClickCreate }: WeightedPlaylistModalProps) {
    const [trackCount, setTrackCount] = React.useState(10);
    const [playlistName, setPlaylistName] = React.useState("");

    function handleCreate() {
        onClickCreate(trackCount);
    }

    // Generate suggested numbers based on common playlist sizes
    const suggestedCounts = [5, 10, 20, 25, 50, 100];

    return (
        <div className="weighted-playlist-modal">
            <div className="weighted-playlist-modal-content">
                <h3 className="weighted-playlist-modal-title">Create Weighted Shuffle Playlist</h3>
                <p className="weighted-playlist-modal-description">
                    Select how many tracks you want in your weighted shuffle playlist. 
                    Tracks will be chosen using the same weighted random selection as the queue system.
                </p>
                
                <div className="weighted-playlist-input-section">
                    <label className="weighted-playlist-label">
                        Number of tracks:
                    </label>
                    <NumberInput 
                        value={trackCount} 
                        onChange={setTrackCount}
                        min={1}
                        max={100}
                    />
                </div>

                <div className="weighted-playlist-suggested">
                    <span className="weighted-playlist-suggested-label">Suggested:</span>
                    <div className="weighted-playlist-suggested-buttons">
                        {suggestedCounts.map(count => (
                            <button
                                key={count}
                                className={`weighted-playlist-suggested-btn ${trackCount === count ? 'active' : ''}`}
                                onClick={() => setTrackCount(count)}
                            >
                                {count}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="weighted-playlist-preview">
                    <span className="weighted-playlist-preview-text">
                        Preview: Your playlist will contain {trackCount} tracks, 
                        selected randomly based on ratings with higher-rated tracks having higher probability.
                    </span>
                </div>

                <div className="weighted-playlist-button-div">
                    <Button name="Cancel" className="weighted-playlist-cancel-button" onButtonClick={onClickCancel} />
                    <Button name="Create Playlist" className="weighted-playlist-create-button" onButtonClick={handleCreate} />
                </div>
            </div>
        </div>
    );
}