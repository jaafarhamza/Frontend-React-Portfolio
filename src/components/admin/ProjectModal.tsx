import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from "@/graphql/mutations/projects";
import { useSkills } from "@/hooks/useSkills";
import type { Project } from "@/types/portfolio.types";

interface ProjectModalProps {
  project?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose, onSuccess }: ProjectModalProps) => {
  const { data: skillsData } = useSkills();
  const [createProject, { loading: creating }] = useMutation(CREATE_PROJECT);
  const [updateProject, { loading: updating }] = useMutation(UPDATE_PROJECT);
  const [deleteProject, { loading: deleting }] = useMutation(DELETE_PROJECT);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrls: [""],
    liveUrl: "",
    repoUrl: "",
    featured: false,
    skillIds: [] as string[]
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        imageUrls: project.imageUrls || [""],
        liveUrl: project.liveUrl || "",
        repoUrl: project.repoUrl || "",
        featured: project.featured || false,
        skillIds: project.skills?.map(s => s.id).filter(Boolean) || []
      });
    } else {
      setFormData({
        title: "",
        description: "",
        imageUrls: [""],
        liveUrl: "",
        repoUrl: "",
        featured: false,
        skillIds: []
      });
    }
  }, [project, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (project) {
        await updateProject({
          variables: { id: project.id, input: formData }
        });
      } else {
        await createProject({
          variables: { input: formData }
        });
      }
      onSuccess();
      onClose();
    } catch {
      console.error("Failed to save project");
    }
  };

  const handleDelete = async () => {
    if (!project || !confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject({ variables: { id: project.id } });
      onSuccess();
      onClose();
    } catch {
      console.error("Failed to delete project");
    }
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...formData.imageUrls];
    newUrls[index] = value;
    setFormData({ ...formData, imageUrls: newUrls });
  };

  const addImageUrl = () => {
    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ""] });
  };

  const removeImageUrl = (index: number) => {
    setFormData({ ...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index) });
  };

  const toggleSkill = (skillId: string) => {
    setFormData({
      ...formData,
      skillIds: formData.skillIds.includes(skillId)
        ? formData.skillIds.filter(id => id !== skillId)
        : [...formData.skillIds, skillId]
    });
  };

  if (!isOpen) return null;

  const skills = skillsData?.skills || [];
  const loading = creating || updating || deleting;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-purple-500/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-purple-500/20 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {project ? "Edit Project" : "Create Project"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded bg-slate-900 border-purple-500/30"
                />
                <span className="text-purple-300">Featured</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 resize-none"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Live URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Repo URL</label>
              <input
                type="url"
                value={formData.repoUrl}
                onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-purple-300">Image URLs</label>
              <button type="button" onClick={addImageUrl} className="text-sm text-purple-400 hover:text-purple-300">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://..."
                  />
                  {formData.imageUrls.length > 1 && (
                    <button type="button" onClick={() => removeImageUrl(index)} className="px-4 text-red-400 hover:bg-red-500/10 rounded-xl">✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Skills</label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill?.id}
                  type="button"
                  onClick={() => toggleSkill(skill?.id || "")}
                  className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                    formData.skillIds.includes(skill?.id || "")
                      ? "bg-purple-500 text-white"
                      : "bg-slate-900/50 text-gray-400 border border-purple-500/30"
                  }`}
                >
                  {skill?.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
            {project && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-6 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors border border-red-500/30 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button type="button" onClick={onClose} className="px-6 py-3 bg-slate-700/50 text-gray-300 rounded-xl hover:bg-slate-700 transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : project ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
