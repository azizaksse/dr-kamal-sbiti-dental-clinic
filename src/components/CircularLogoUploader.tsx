"use client";

import { useState, useRef, useCallback, type ReactElement } from "react";
import Image from "next/image";
import { Upload, X, Check } from "lucide-react";

interface CircularLogoUploaderProps {
  onImageUpload?: (imageUrl: string, file: File) => void;
  initialImage?: string;
  maxFileSize?: number; // in MB
  className?: string;
}

export default function CircularLogoUploader({
  onImageUpload,
  initialImage,
  maxFileSize = 5,
  className = ""
}: CircularLogoUploaderProps): ReactElement {
  const [uploadedImage, setUploadedImage] = useState<string>(initialImage || "");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate file
  const validateFile = useCallback((file: File): string | null => {
    const supportedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    
    if (!supportedFormats.includes(file.type)) {
      return "Format non supporté. Utilisez JPG, PNG ou WebP.";
    }
    
    if (file.size > maxFileSize * 1024 * 1024) {
      return `Taille maximale: ${maxFileSize}MB`;
    }
    
    return null;
  }, [maxFileSize]);

  // Convert file to base64 URL
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle file upload
  const handleFileUpload = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      setUploadStatus("error");
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");
    setErrorMessage("");

    try {
      const imageUrl = await convertToBase64(file);
      setUploadedImage(imageUrl);
      setUploadStatus("success");
      onImageUpload?.(imageUrl, file);
    } catch {
      setErrorMessage("Erreur lors du traitement de l'image");
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  }, [onImageUpload, validateFile]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setUploadedImage("");
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`circular-logo-uploader ${className}`}>
      {/* Circular Logo Display */}
      <div className="logo-container">
        {uploadedImage ? (
          <div className="relative group">
            <Image
              src={uploadedImage}
              alt="Logo One Smile Lab"
              width={120}
              height={120}
              className="circular-logo-image"
              loading="lazy"
              onError={() => {
                setErrorMessage("Erreur lors du chargement de l'image");
                setUploadStatus("error");
              }}
            />
            
            {/* Status Indicator */}
            <div className={`status-indicator ${uploadStatus}`}>
              {uploadStatus === "success" && <Check className="w-3 h-3" />}
              {uploadStatus === "error" && <X className="w-3 h-3" />}
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemoveImage}
              className="remove-button"
              aria-label="Supprimer le logo"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            className={`upload-area ${isDragOver ? "drag-over" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            role="button"
            tabIndex={0}
            aria-label="Télécharger un logo"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerFileInput();
              }
            }}
          >
            <Upload className="upload-icon" />
            <p className="upload-text">
              {isDragOver ? "Relâchez pour télécharger" : "Cliquez ou glissez-déposez"}
            </p>
            <p className="upload-hint">
              JPG, PNG, WebP • Max {maxFileSize}MB
            </p>
          </div>
        )}

        {/* Loading Overlay */}
        {isUploading && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p className="loading-text">Traitement...</p>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={supportedFormats.join(",")}
        onChange={handleInputChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* Error Message */}
      {errorMessage && (
        <div className="error-message" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Instructions */}
      {!uploadedImage && (
        <div className="instructions">
          <p className="text-sm text-gray-600 text-center mt-2">
            Recommandé: Image carrée, fond transparent ou uni
          </p>
        </div>
      )}

      {/* CSS Styles */}
      <style jsx>{`
        .circular-logo-uploader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .logo-container {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border: 2px solid #dee2e6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .logo-container:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .circular-logo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .upload-area {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px dashed #ced4da;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        }

        .upload-area:hover,
        .upload-area.drag-over {
          border-color: #007bff;
          background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
          transform: scale(1.05);
        }

        .upload-icon {
          width: 20px;
          height: 20px;
          color: #6c757d;
          margin-bottom: 0.25rem;
        }

        .upload-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: #495057;
          text-align: center;
          margin: 0;
        }

        .upload-hint {
          font-size: 0.625rem;
          color: #6c757d;
          text-align: center;
          margin: 0;
        }

        .status-indicator {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .status-indicator.success {
          background: #28a745;
          color: white;
        }

        .status-indicator.error {
          background: #dc3545;
          color: white;
        }

        .remove-button {
          position: absolute;
          top: -8px;
          left: -8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #dc3545;
          color: white;
          border: none;
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .group:hover .remove-button {
          display: flex;
        }

        .remove-button:hover {
          background: #c82333;
          transform: scale(1.1);
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #e9ecef;
          border-top: 2px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          font-size: 0.625rem;
          color: #495057;
          margin-top: 0.25rem;
          margin: 0;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          text-align: center;
          border: 1px solid #f5c6cb;
          max-width: 200px;
        }

        .instructions {
          text-align: center;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .logo-container {
            width: 40px;
            height: 40px;
          }
          
          .upload-icon {
            width: 16px;
            height: 16px;
          }
          
          .upload-text {
            font-size: 0.625rem;
          }
          
          .upload-hint {
            font-size: 0.5rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .logo-container {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
}
